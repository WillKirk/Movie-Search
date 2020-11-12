import React, { Component } from 'react';
import './App.css';
import styles from "./App.module.scss";

class App extends Component {
  state={
    year: "",
    search: "",
    searchResults: ""
  }

  searchChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  yearChange = (event) => {
    this.setState({
      year: event.target.value
    })
  }

  buttonClicked = () => {
    console.log(this.state.search);
    console.log(this.state.year);

    const apiCall = this.state.year ? `http://www.omdbapi.com/?s=${this.state.search}&y=${this.state.year}&apikey=cc5c57d9` : `http://www.omdbapi.com/?s=${this.state.search}&apikey=cc5c57d9`;
    fetch(apiCall)
    .then((res) => res.json())
    .then((res) => {
      this.setState({ searchResults: res });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  grabMovies = () => {
    if (this.state.searchResults.Response === "True") {
      return this.state.searchResults.Search.map(this.movieMapper)
    } else {
      return "No movies found"
    }
  }

  movieMapper = (movie, i) => {
    return (
      <div key={i} className={styles.movies}>
        <p className={styles.movieTitle}>{movie.Title}</p>
        <p className={styles.movieYear}>{movie.Year}</p>
        <div className={styles.moviePoster}>
          {movie.Poster === "N/A" ? <img src="https://picsum.photos/300/425" alt="Random Photo"/> : <img src={movie.Poster} alt="Movie Poster"/>}
        </div>
      </div>   
    )
  }

  render() {

    return (
      <section className={styles.container}>
        <div className={styles.navBar}>
          <div className={styles.title}>
            <h1>Movie Search</h1>
          </div>
          <div className={styles.inputForm}>
            <div className={styles.inputBox}>
              <input type="text" placeholder="Movie" value={this.state.search} onChange={this.searchChange}/>
            </div>
            <div className={styles.inputBox}>
              <input type="number" placeholder="Year" value={this.state.year} onChange={this.yearChange}/>
            </div>
            <div className={styles.inputBox}>
              <button onClick={this.buttonClicked}>Search</button>
            </div>
          </div>
        </div>
        <div>
          {this.grabMovies()}
        </div>
      </section>
    );
  }
}

export default App;
