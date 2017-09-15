import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'



class BooksApp extends React.Component {

  state = {
    books: []
  }

  // retrieve current books from API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState( {books} )
    })
  }

  // update book shelf state and API
  updateBooksState = (clickedBook, newShelf) => {
    const updatedBooksArray = this.state.books.map( (book) => {
      if (book.id === clickedBook) {
          book.shelf = newShelf
          BooksAPI.update(book, newShelf)
          return book
        } else {
          return book
        }
      }
    )

    this.setState({
      books: updatedBooksArray
    })
  }

  // add new book from search to state and API
  addBook = (clickedBook, newShelf) => {
    BooksAPI.update(clickedBook, newShelf).then(
      BooksAPI.getAll().then((books) => {
        this.setState( {books} )}
    )
  )}

  render() {
    return (

      <div className="app">

        <Route exact path="/search" render={() => (
          <Search updateBooks={this.addBook} books={this.state.books} />
        )} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf shelfName="Currently Reading" books={this.state.books} shelfId="currentlyReading" updateBooks={this.updateBooksState} />
                <Shelf shelfName="Want to Read" books={this.state.books} shelfId="wantToRead" updateBooks={this.updateBooksState}/>
                <Shelf shelfName="Read" books={this.state.books} shelfId="read" updateBooks={this.updateBooksState} />
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search"
                >Add a book</Link>
            </div>
          </div>

        )} />


      </div>

  )}
}

export default BooksApp
