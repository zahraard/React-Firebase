import React, { Component } from "react";
import { firebaseMatches } from "../../../firebase";
import { firebaseLooper } from "../../UI/Misc";
import MatchesBlock from "./../../UI/matches_block";
import Slide from "react-reveal/Slide";

class Blocks extends Component {
  state = { matches: [] };

  showMatches = matches =>
    matches
      ? this.state.matches.map(match => (
          <Slide bottom key={match.id}>
            <div className="item">
              <div className="wrapper">
                <MatchesBlock match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;
  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once("value")
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({ matches: matches.reverse() });
      });
    //
  }
  render() {
    return (
      <div className="home_matches">{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Blocks;
