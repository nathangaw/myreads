import React from 'react';
import Book from './Book'
/*import PropTypes from 'prop-types'*/
/*import * as BooksAPI from './BooksAPI'*/

class Shelf extends React.Component {


  state = {


  }

  render() {




    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>

        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <Book key={book.id} />
            ))}
          </ol>
        </div>
      </div>

    )
  }






}

export default Shelf
