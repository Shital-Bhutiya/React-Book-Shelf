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
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  handleOption = (value, id, index) => {
    let newBooks = this.state.books;

    switch (value) {
      case "currentlyReading":
        newBooks[index].shelf = "currentlyReading";
        break;

      case "wantToRead":
        newBooks[index].shelf = "wantToRead";
        break;

      case "read":
        newBooks[index].shelf = "read";
        break;

      case "none":
        newBooks.splice(index, 1);
        break;
    }

    this.setState({ books: newBooks });
  };
  componentDidMount() {
    BooksAPI.getAll().then(json => {
      let newBooks = [];
      json.forEach(book => {
        newBooks.push(book);
      });
      console.log(newBooks);
      this.setState({ books: newBooks });
    });
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Route
                excat
                path="/"
                render={() => {
                  return (
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
                    </div>
                  );
                }}
              />
                <Route excat path="/Search"
             render={()=>{return(<Search />)}}/>
            </div>
            {/* <div className="open-search">
              <Link
                to="/Search">
                Add a book
              </Link>
            </div> */}
          
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;