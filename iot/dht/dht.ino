#include <WiFi.h>
#include <WiFiMulti.h>
WiFiMulti wifiMulti;
#include <PubSubClient.h>
#include <DHT.h>
#include <ArduinoJson.h>  

#define DHTPIN 4
#define DHTTYPE DHT11

#define PIN_RELE 2

DHT dht(DHTPIN, DHTTYPE);

#include <DATA.h>

const uint16_t mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastPublish = 0;
const unsigned long publishInterval = 6000; 

const float a = 1.0;
const float b = -6.0;

void escanearRedes(){
  Serial.println("Escaneando redes WiFi...");
  WiFi.mode(WIFI_STA);
  int n = WiFi.scanNetworks();
  if (n == 0){
    Serial.println("No se encontraron redes.");
  }else{
    for (int i = 0; i<n; ++i){
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (RSSI: ");
      Serial.print(WiFi.RSSI(i));
      Serial.print(" dBm)");
    }
  }
}

void conectarWiFi(){
  Serial.println("Buscando mejor red WiFi...");

  unsigned long tiempoInicio = millis();
  while (wifiMulti.run() != WL_CONNECTED && millis() - tiempoInicio < 15000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConectado a la red WiFi.");
    Serial.print("SSID: ");
    Serial.println(WiFi.SSID());
    Serial.print("Dirección IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nError: No se pudo conectar a la red WiFi.");
    Serial.print("Estado WiFi: ");
    Serial.println(WiFi.status());
    escanearRedes();
  }
}

void iniciarWiFi() {
  WiFi.mode(WIFI_STA);
  wifiMulti.addAP(ssid_1, password_1);
  // wifiMulti.addAP(ssid_2, password_2);
  conectarWiFi();
}

void configurarMQTT() {

  String willPayload;

  client.setServer(BrokerMQTT, mqtt_port);

  StaticJsonDocument<200> will;
  will["device"] = NombreESP;
  will["status"] = "disconnected_unexpected";
  will["location"] = Ubicacion;

  serializeJson(will, willPayload);
}

void reconnect() {
  String willPayload;
  while (!client.connected()) {
    Serial.print("Intentando conexión MQTT...");

    if (client.connect(NombreESP, "clima/status", 1, true, willPayload.c_str())) {
      Serial.println("¡Conectado al broker MQTT!");

      StaticJsonDocument<200> status;
      status["device"] = NombreESP;
      status["status"] = "connected";
      status["location"] = Ubicacion;
      String payload;
      serializeJson(status, payload);
      client.publish("clima/status", payload.c_str(), true);
    } else {
      Serial.print("Fallo, rc=");
      Serial.print(client.state());
      Serial.println(" -> reintentando en 5 segundos");
      delay(5000);
    }
  }
}

//sensor DHT11
bool publishSensorHumedad(const char* sensor, const char* campo, float value, uint8_t decimals = 2) {
  const char* topic = "clima/interior/aula";

  StaticJsonDocument<256> doc;
  doc["device"] = NombreESP;
  doc["sensor"] = sensor;
  doc["campo"] = campo;
  doc["location"] = Ubicacion;
  doc["value"] = roundf(value * pow(10, decimals)) / pow(10, decimals);

  String payload;
  serializeJson(doc, payload);

  bool ok = client.publish(topic, payload.c_str());
  Serial.printf("MQTT -> %s : %s [%s]\n", topic, payload.c_str(), ok ? "OK" : "FAIL");
  return ok;
}

void setup() {

  Serial.begin(115200);

  delay(1000);
  Serial.println("===== INICIANDO ESP32 =====");

  pinMode(PIN_RELE, OUTPUT);        
  digitalWrite(PIN_RELE, HIGH);    
  
  iniciarWiFi();
  configurarMQTT();
  reconnect();  

  dht.begin();
  Serial.println("ESP32 iniciado");
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi desconectado, intentando reconexión...");
    conectarWiFi();
  }

  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  unsigned long now = millis();
  if (now - lastPublish >= publishInterval) {
    lastPublish = now;

    // === LECTURAS DHT11 ===
    float humedad = dht.readHumidity();
    float tempRaw = dht.readTemperature();

    if (isnan(humedad) || isnan(tempRaw)) {
      Serial.println("Error al leer datos del sensor DHT11!");
    } else {
      
      float temperatura = a * tempRaw + b;

      Serial.print("Temp RAW: ");
      Serial.print(tempRaw);
      Serial.print(" Temperatura: ");
      Serial.print(temperatura);
      Serial.print(" °C | Humedad: ");
      Serial.print(humedad);
      Serial.println(" %");

      publishSensorHumedad("dht11", "temperatura", temperatura);
      publishSensorHumedad("dht11", "humedad", humedad);

      //ENCENDER RELÉ SI TEMPERATURA > 23 °C
      if (temperatura > 23 {
        digitalWrite(PIN_RELE, LOW); 
        Serial.println("Temperatura alta: Relé ENCENDIDO");
      } else {
        digitalWrite(PIN_RELE, HIGH);
        Serial.println("Temperatura normal: Relé APAGADO");
      }
    }
  }

}
