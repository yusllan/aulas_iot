import React from "react";
import styles from "./Footer.module.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>Sistema IoT Escolar</h3>
        <p className={styles.footerDescription}>
          Tecnología avanzada para el futuro de la educación
        </p>
        <div className={styles.socialIcons}>
          <a href="#" aria-label="Facebook" className={styles.socialIcon}>
            <FacebookIcon />
          </a>
          <a href="#" aria-label="Twitter" className={styles.socialIcon}>
            <TwitterIcon />
          </a>
          <a href="#" aria-label="LinkedIn" className={styles.socialIcon}>
            <LinkedInIcon />
          </a>
        </div>
      </div>

      <div className={styles.footerSection}>
        <h4 className={styles.footerSubtitle}>Enlaces Rápidos</h4>
        <ul className={styles.footerLinks}>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Características</a>
          </li>
          <li>
            <a href="#">Precios</a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
        </ul>
      </div>

      <div className={styles.footerSection}>
        <h4 className={styles.footerSubtitle}>Soporte</h4>
        <ul className={styles.footerLinks}>
          <li>
            <a href="#">Centro de Ayuda</a>
          </li>
          <li>
            <a href="#">Documentación</a>
          </li>
          <li>
            <a href="#">Políticas de Privacidad</a>
          </li>
          <li>
            <a href="#">Términos de Servicio</a>
          </li>
        </ul>
      </div>

      <div className={styles.footerSection}>
        <h4 className={styles.footerSubtitle}>Contacto</h4>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <PhoneIcon className={styles.contactIcon} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className={styles.contactItem}>
            <EmailIcon className={styles.contactIcon} />
            <span>info@ioteducacion.com</span>
          </div>
          <div className={styles.contactItem}>
            <LocationOnIcon className={styles.contactIcon} />
            <span>Av. Tecnología 123, Ciudad Digital</span>
          </div>
        </div>
      </div>
    </div>

    <div className={styles.footerBottom}>
      <div className={styles.footerBottomContent}>
        <p>
          © {new Date().getFullYear()} Sistema IoT Escolar. Todos los derechos
          reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
