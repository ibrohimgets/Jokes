import React, { Component } from "react";
import axios from "axios";
import "./Jokelist.css";
import Joke from "./Joke";
const URL = "https://icanhazdadjoke.com/";
class Jokelist extends Component {
  static defaultProps = {
    numJ: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      laoding: false,
    };
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }
  async getJokes() {
    const joke = [];
    while (joke.length < this.props.numJ) {
      const res = await axios.get(URL, {
        headers: { Accept: "application/json" },
      });
      joke.push({ id: res.data.id, text: res.data.joke, votes: 0 });
    }
    this.setState({ laoding: false });
    this.setState({ jokes: joke });
  }
  handleVote = (id, delta) => {
    this.setState((old) => ({
      jokes: old.jokes.map((newJoke) => {
        return newJoke.id === id
          ? { ...newJoke, votes: newJoke.votes + delta }
          : newJoke;
      }),
    }));
  };

  handleClick = () => {
    this.setState(
      {
        laoding: true,
      },
      this.getJokes
    );
  };
  render() {
    if (this.state.laoding) {
      return (
        <div className="Jokelist-spinner">
          <i class="far fa-8x fa-laugh fa-spin"></i>
          <h1 className="title">Laoding...</h1>
        </div>
      );
    }

    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="title">Joke List:</h1>
          <img
            className="img"
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          />
          <button className="btn" onClick={this.handleClick}>
            newJoke
          </button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map((newJoke) => {
            return (
              <Joke
                key={newJoke.id}
                votes={newJoke.votes}
                jokes={newJoke.text}
                upVote={() => this.handleVote(newJoke.id, 1)}
                downVote={() => this.handleVote(newJoke.id, -1)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Jokelist;
