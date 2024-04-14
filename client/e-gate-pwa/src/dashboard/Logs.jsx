import { useState, useEffect } from "react";
import "./Logs.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { API } from "../../APIendpoints";

export const Logs = () => {
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ inCampus: 0, outCampus: 0, expired: 0 });

  useEffect(() => {
    const fetchAlerts = async () => {
      const data = (await API.GetAlerts()).data;
      setAlerts(data.alerts);
      console.log(data);
    };
    const fetchLogs = async () => {
      const data = (await API.GetAllLogs()).data;
      setLogs(data.logs);
      console.log(data);
    };

    const fetchStats = async () => {
      const data = (await API.GetStats()).data;
      console.log(data);
      setStats(data.stats);
    };
    fetchLogs();
    fetchAlerts();
    fetchStats();
  }, []);

  return (
    <div className="main">
      <div>
        <h1>Admin Pannel</h1>
      </div>
      <div>
        <h4>In Campus: {stats.inCampus}</h4>
        <h4>Out of Campus: {stats.outCampus}</h4>
        <h4>Expired: {stats.expired}</h4>
      </div>
      <div>
        <div className="title">
          <h3>Notifications</h3>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Expiry Time</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Time checked in</TableCell>
                <TableCell align="right">Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map((row, idx) => (
                <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.user?.name}
                  </TableCell>
                  <TableCell align="right">{new Date(row.expiry).toISOString()}</TableCell>
                  <TableCell align="right">{row.user?.email}</TableCell>
                  <TableCell align="right">{row.user?.entry}</TableCell>
                  <TableCell align="right">{row.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <div className="title">
          <h3>Logs</h3>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Time checked in</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">User Type</TableCell>
                <TableCell align="right">Enry/Exit</TableCell>
                <TableCell align="right">Purpose</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((row, idx) => (
                <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.user?.name}
                  </TableCell>
                  <TableCell align="right">{new Date(row.time).toISOString()}</TableCell>
                  <TableCell align="right">{row.user?.email}</TableCell>
                  <TableCell align="right">{row.user?.type}</TableCell>
                  <TableCell align="right">{row.inCampus ? "In Campus" : "Not in Campus"}</TableCell>
                  <TableCell align="right">{row.user?.purpose}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
