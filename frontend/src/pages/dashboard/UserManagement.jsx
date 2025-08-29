import React, { useState, useEffect } from "react";
import UserList from "../../components/UserList/UserList";
import { api } from "../../services/api/api";
import {
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import styles from "./Dashboard.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.usuarios.getAll();
      setUsers(response.data.usuarios || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(
        error.response?.data?.message ||
          "Error al cargar los usuarios. Verifique su rol y la conexión."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Paper className={styles.contentPaper}>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <UserList users={users} loading={loading} />
      )}

      <Button
        onClick={fetchUsers}
        variant="contained"
        style={{ marginTop: "1rem" }}
      >
        Refrescar
      </Button>
    </Paper>
  );
};

export default UserManagement;
