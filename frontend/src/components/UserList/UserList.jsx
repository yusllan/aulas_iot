// src/components/UserList/UserList.jsx
import React from "react";
import styles from "./UserList.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

const UserList = ({ users, loading }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
        <Typography>Cargando usuarios...</Typography>
      </div>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: "2rem",
        width: "auto",
        display: "inline-block",
        backgroundColor: "#0b2752ff",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeaderCell}>ID</TableCell>
            <TableCell className={styles.tableHeaderCell}>Nombre</TableCell>
            <TableCell className={styles.tableHeaderCell}>Apellido</TableCell>
            <TableCell className={styles.tableHeaderCell}>Email</TableCell>
            <TableCell className={styles.tableHeaderCell}>Rol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell
                className={styles.tableBodyCell}
                component="th"
                scope="row"
              >
                {user.id}
              </TableCell>
              <TableCell className={styles.tableBodyCell}>
                {user.nombre}
              </TableCell>
              <TableCell className={styles.tableBodyCell}>
                {user.apellido}
              </TableCell>
              <TableCell className={styles.tableBodyCell}>
                {user.email}
              </TableCell>
              <TableCell className={styles.tableBodyCell}>{user.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
