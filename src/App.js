import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";
import Search from "./Search";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  handleOption = (value, book, index) => {
    let newBooks = [];
    if (value !== "none")
      BooksAPI.update(book, value).then(books => {
        BooksAPI.getAll().then(json => {
          json.forEach(book => {
            newBooks.push(book);
          });
          this.setState({ books: newBooks });
        });
      });
    else {
      newBooks = this.state.books;
      newBooks.splice(index, 1);
      this.setState({ books: newBooks });
    }
  };

  addMoreBooks = newBooks => {
    this.setState({ books: newBooks });
  };

  componentDidMount() {
    BooksAPI.getAll().then(json => {
      let newBooks = [];
      json.forEach(book => {
        newBooks.push(book);
      });

      this.setState({ books: newBooks });
    });
  }
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <Read
                      Books={this.state.books}
                      handleOption={this.handleOption}
                    />
                    <CurrentlyReading
                      Books={this.state.books}
                      handleOption={this.handleOption}
                    />
                    <WantToRead
                      Books={this.state.books}
                      handleOption={this.handleOption}
                    />
                    <div className="open-search">
                      <Link to="/Search">Add a book</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />
        <Route
          exact
          path="/Search"
          render={() => {
            return (
              <Search
                addMoreBooks={this.addMoreBooks}
                books={this.state.books}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default BooksApp;
