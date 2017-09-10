import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
/*import * as BooksAPI from './BooksAPI'*/

class Shelf extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired
  }

  state = {


  }

  render() {


    const { books, shelfName } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

          </ol>
        </div>
      </div>

    )
  }






}

export default Shelf
