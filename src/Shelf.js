import React from 'react';
import Book from './Book'
/*import PropTypes from 'prop-types'*/
/*import * as BooksAPI from './BooksAPI'*/

class Shelf extends React.Component {

  render() {

    return (
      <div className="bookshelf" id="{this.props.shelfId}">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>

        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* filter books array, only returning books whose shelf property matches the id of the shelf. Then map over output creating a Book component for each book */}
            { this.props.books.filter( book => this.props.shelfId === book.shelf )
              .map((book) => (
              <Book key={book.id} id={book.id} title={book.title} authors={book.authors} jacket={book.imageLinks} updateBooks={this.props.updateBooks} shelfValue={book.shelf}/>
            ))}
          </ol>
        </div>
      </div>

    )
  }

}

export default Shelf
