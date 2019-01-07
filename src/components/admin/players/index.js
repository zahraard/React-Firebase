import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";
import { firebasePlayers } from "../../../firebase";
import { firebaseLooper } from "../../UI/Misc";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

class AdminPlayers extends Component {
  state = {
    players: [],
    isLoading: true
  };

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);
      this.setState({ players: players.reverse(), isLoading: false });
    });
  }
  render() {
    return (
      <AdminLayout>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.players.map((player, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <Link to={`/admin_players/add_players/${player.id}`}>
                        {player.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin_players/add_players/${player.id}`}>
                        {player.lastname}
                      </Link>
                    </TableCell>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        {this.state.isLoading ? (
          <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
        ) : (
          ""
        )}
      </AdminLayout>
    );
  }
}

export default AdminPlayers;
