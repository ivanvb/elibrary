import React from 'react';

const BookDetails = (props) => {
    return (
        <div>
            <h2>{props.title} written by {props.author}</h2>
        </div>
    );
};

export default BookDetails;