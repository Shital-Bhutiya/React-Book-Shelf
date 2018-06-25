import * as BooksAPI from "./BooksAPI";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class Search extends Component {
  state = {
    searchBook: [],
    query: ""
  };

  handleInput = e => {
    const value = e.target.value;
    if (value) this.fetchBooks(value);
    else this.setState({ query: "", searchBook: [] });
  };

  fetchBooks = value => {
    BooksAPI.search(value).then(json => {
      if (Array.isArray(json)) {
        json.forEach(book => {
          const resultBook = this.props.books.find(function(obj) {
            return obj.id === book.id;
          });
          if (resultBook) {
            book.shelf = resultBook.shelf;
          } else {
            const image = book.imageLinks
              ? book.imageLinks.smallThumbnail
                ? book.imageLinks.smallThumbnail
                : "http://www.theinvisiblegorilla.com/images/book_cover_coming.jpg"
              : "http://www.theinvisiblegorilla.com/images/book_cover_coming.jpg";
            book.imageLinks = {};
            book.imageLinks.smallThumbnail = image;
            book.shelf = "none";
          }
        });
        this.setState({ query: value, searchBook: json });
      } else {
        this.setState({ query: value, searchBook: [] });
      }
    });
  };

  handleOption = (book, value) => {
    // update the searched array
    let newsearchBook = this.state.searchBook;
    const resultBookIndex = newsearchBook.findIndex(function(obj, index) {
      return obj.id === book.id;
    });
    newsearchBook[resultBookIndex].shelf = value;
    this.setState({ searchBook: newsearchBook });

    let newBooks = this.props.books;
    const resultBook = newBooks.find(function(obj, index) {
      return obj.id === book.id;
    });

    if (resultBook) {
      BooksAPI.update(resultBook, value).then(books => {
        BooksAPI.getAll().then(json => {
          newBooks = json;

          this.props.addMoreBooks(newBooks);
        });
      });
    } else {
      BooksAPI.update(book, value).then(books => {
        BooksAPI.getAll().then(json => {
          newBooks = json;

          this.props.addMoreBooks(newBooks);
        });
      });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              onKeyUp={this.handleInput}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBook.map((book, index) => {
              return (
                <div key={book.id}>
                  <li>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks.smallThumbnail
                            })`
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            value={book.shelf}
                            onChange={e =>
                              this.handleOption(book, e.target.value)
                            }>
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                </div>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
