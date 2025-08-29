// src/components/SettingsMenu/SettingsMenuVertical.jsx
import React from "react";
import styles from "./SettingsMenuVertical.module.css";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Person as PersonIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const SettingsMenuVertical = ({ onOptionClick, activeOption }) => {
  return (
    <div className={styles.verticalMenu}>
      <List>
        <ListItemButton
          selected={activeOption === "credentials"}
          onClick={() => onOptionClick("credentials")}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Mis Credenciales" />
        </ListItemButton>
        <ListItemButton
          selected={activeOption === "users"}
          onClick={() => onOptionClick("users")}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Gestionar Usuarios" />
        </ListItemButton>
        <ListItemButton onClick={() => onOptionClick("logout")}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default SettingsMenuVertical;
