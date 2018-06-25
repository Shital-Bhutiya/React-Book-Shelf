import React, { Component } from "react";

class CurrentlyReading extends Component {
  handleOption(value, book, index) {
    this.props.handleOption(value, book, index);
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, index) => {
              return (
                <div key={book.id}>
                  {book.shelf === "currentlyReading" && (
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
                                this.handleOption(e.target.value, book, index)
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
                  )}
                </div>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default CurrentlyReading;
