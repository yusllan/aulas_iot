import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import SchoolIcon from "@mui/icons-material/School";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { loginUser } from "../../services/api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("usuario", JSON.stringify(response.usuario));

      navigate("/dashboard");
    } catch (error) {
      console.error("Error de login:", error);
      alert(error.message || "Error al iniciar sesión");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.leftSection}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1>El futuro está en tus manos</h1>
          <p>
            Conecta con la educación del mañana mediante nuestra plataforma IoT
            avanzada que transforma la experiencia de aprendizaje.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <TrendingUpIcon />
              </div>
              <div className={styles.featureText}>
                <h3>Monitoreo en Tiempo Real</h3>
                <p>
                  Sigue el progreso de estudiantes y dispositivos IoT al
                  instante
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GroupIcon />
              </div>
              <div className={styles.featureText}>
                <h3>Gestión de Clases</h3>
                <p>
                  Administra múltiples aulas y grupos de estudiantes
                  eficientemente
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <AnalyticsIcon />
              </div>
              <div className={styles.featureText}>
                <h3>Analíticos Avanzados</h3>
                <p>
                  Obtén insights detallados sobre el rendimiento y participación
                </p>
              </div>
            </div>
          </div>

          <div className={styles.quote}>
            <p>
              "La tecnología es sólo una herramienta. Para conseguir que los
              niños trabajen juntos y motivarles, el profesor es lo más
              importante."
            </p>
            <span>- Bill Gates</span>
          </div>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.loginCard}>
          <div className={styles.headerButtons}>
            <button className={styles.backButton} onClick={handleBack}>
              <ArrowBackIcon />
            </button>
            <button className={styles.themeToggle} onClick={toggleDarkMode}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
          </div>

          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <SchoolIcon style={{ fontSize: 40, color: "#fff" }} />
            </div>
            <h2>Sistema IoT Escolar</h2>
          </div>

          <h1 className={styles.welcomeText}>BIENVENIDO</h1>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div
              className={`${styles.inputGroup} ${
                isEmailFocused ? styles.focused : ""
              }`}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                required
                placeholder="tu.email@ejemplo.com"
              />
            </div>

            <div
              className={`${styles.inputGroup} ${
                isPasswordFocused ? styles.focused : ""
              }`}
            >
              <label htmlFor="password">Contraseña</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  className={`${styles.togglePassword} ${
                    showPassword ? styles.visible : ""
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </div>

            <div className={styles.rememberForgot}>
              <label className={styles.rememberMe}>
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>
              <a href="#" className={styles.forgotPassword}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" className={styles.loginButton}>
              Iniciar Sesión
            </button>
          </form>

          <div className={styles.signupSection}>
            <p>
              ¿No tienes una cuenta?{" "}
              <a href="#" className={styles.signupLink}>
                Regístrate ahora
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
