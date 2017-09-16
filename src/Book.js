import React, { Component } from 'react'

class Book extends Component {



  render() {
    const { updateBooks, id } = this.props

    return (
      <li>
        <div className="book">
          <div className="book-top">
            {/* missing thumbnail fix from matiaslgh on slack channel */}
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + (this.props.jacket ? this.props.jacket.thumbnail : "https://books.google.com/googlebooks/images/no_cover_thumb.gif") + ")" }}>
            </div>
            <div className="book-shelf-changer">
              <select value={this.props.shelfValue} onChange={(event) => updateBooks(id, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}
          </div>
          <div className="book-authors">
          { this.props.authors ? this.props.authors.join(', ') : '' }
          </div>
        </div>
      </li>

    )
  }

}

export default Book
