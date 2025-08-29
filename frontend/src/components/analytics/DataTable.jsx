import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  CircularProgress,
} from "@mui/material";
import { api } from "../../services/api/api";

const DataTable = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let response;

      if (activeTab === 0) {
        response = await api.humedad.getAll();
      } else {
        response = await api.temperatura.getAll();
      }

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: darkMode ? "#1e1e2f" : "#ffffff" }}>
      <Typography variant="h5" gutterBottom>
        Datos Históricos
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Humedad" />
          <Tab label="Temperatura" />
        </Tabs>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dispositivo</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Fecha y Hora</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Chip
                          label={`Dispositivo ${row.dispositivo}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {activeTab === 0 ? `${row.valor}%` : `${row.valor}°C`}
                      </TableCell>
                      <TableCell>{formatDate(row.fecha)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ color: darkMode ? "#fff" : "inherit" }}
          />
        </>
      )}
    </Paper>
  );
};

export default DataTable;
