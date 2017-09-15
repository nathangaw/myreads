import React from 'react';
/*import PropTypes from 'prop-types'*/
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class Search extends React.Component {


  state = {
    query: '',
    searchResults: []
  }

  compareSearchShelf = () => {

    // create Sets of book ids - one for search results, one for shelves
    const s = new Set(this.state.searchResults.map( result => result.id ))
    const b = new Set(this.props.books.map( result => result.id ))

    // create array of ids that are in both Sets
    let intersection = new Set([...s].filter(x => b.has(x)))

    // create array of book objects that are in both search results and shelves
    let crossoverBooks = this.props.books.filter( result => intersection.has(result.id) )

    if (crossoverBooks.length) {

      // convert intersection Set to array for use below
      let intersectionArray = Array.from(intersection)

      // create array of searchResults with crossover books removed
      let searchMinusCrossover = this.state.searchResults.filter( result => {
        return intersectionArray.indexOf(result.id) === -1
      })

      // set shelfValue of none on non-crossover books
      let resultsMinusCrossover = searchMinusCrossover.map( result => {
        result.shelf = "none"
        return result
      })

      // combine the updated books with the rest of the search results
      let updatedSearchResults = crossoverBooks.concat(resultsMinusCrossover)

      // update searchResults state
      this.setState({
        searchResults: updatedSearchResults
      })

    } else {

      let searchWithShelf = this.state.searchResults.map ( result => {
        result.shelf = "none"
        return result
      })

      this.setState({
        searchResults: searchWithShelf
      })

    }


  }

  getResults = (query) => {
    this.setState( {
      query: query
    })

    BooksAPI.search(query, 20).then((searchResults) => {
      this.setState( {
        searchResults
      },
      this.compareSearchShelf
      )
    })
  }

  render() {

    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
              to="/"
              className="close-search"
              >Close</Link>

          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.getResults(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.searchResults.map((book) => (
              <Book key={book.id} id={book.id} title={book.title} authors={book.authors} jacket={book.imageLinks.thumbnail} updateBooks={this.props.updateBooks} shelfValue={book.shelf} />))
            }

          </ol>
        </div>
      </div>

    )
  }
}

export default Search
