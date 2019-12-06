import React from 'react';

const BookList = (props) => {
    let booklist = props.books.map((book, index) =>{
        return <li key={index}>{book.title} by {book.author}</li>
    })
    return (
        <ul>
            {booklist}
        </ul>
    );
};

export default BookList;