// src/components/SettingsMenu/SettingsMenu.jsx
import React, { useState } from "react";
import styles from "./SettingsMenu.module.css";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsMenuVertical from "./SettingsMenuVertical";
import UserManagement from "../../pages/dashboard/UserManagement";

const UserCredentials = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Typography variant="h6">
        No se pudo cargar la información del usuario.
      </Typography>
    );
  }

  return (
    <Card className={styles.userCard}>
      <CardContent className={styles.cardContent}>
        <Avatar className={styles.avatar}>
          {user.nombre.charAt(0)}
          {user.apellido.charAt(0)}
        </Avatar>
        <div className={styles.userInfo}>
          <Typography variant="h5" component="div">
            {user.nombre} {user.apellido}
          </Typography>
          <Typography color="text.secondary">{user.email}</Typography>
          <Typography color="text.secondary">Rol: {user.rol}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const SettingsMenu = ({ onViewChange }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [activeOption, setActiveOption] = useState("credentials");

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpenLogoutDialog(false);
  };

  const handleOptionClick = (option) => {
    if (option === "logout") {
      setOpenLogoutDialog(true);
    } else {
      setActiveOption(option);
      if (option === "users") {
        onViewChange("users");
      }
    }
  };

  const renderContent = () => {
    switch (activeOption) {
      case "credentials":
        return <UserCredentials />;
      case "users":
        return <UserManagement />;
      default:
        return <UserCredentials />;
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <SettingsMenuVertical
        onOptionClick={handleOptionClick}
        activeOption={activeOption}
      />
      <div className={styles.content}>{renderContent()}</div>

      <Dialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar Cierre de Sesión"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres cerrar la sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogout} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SettingsMenu;
