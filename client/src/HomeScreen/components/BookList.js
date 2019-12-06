import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

const BookList = (props) => {
    let booklist = props.books.map((book, index) =>{
        return (
            <LinkContainer key={index} style={{cursor: "pointer"}} to={{
                pathname: '/details/',
                _id: book._id
            }}>
                <p>{book.title} by {book.author}</p>
            </LinkContainer>
        )
    })
    return (
        <div>
            {booklist}
        </div>
    );
};

export default BookList;