import React from 'react';
import BookForm from '../Shared/forms/Book.form';

const EditBook = (props) => {
    async function handleSubmit(formDate){
        let req = await fetch(`/book/${props.location._id}`, {
            method: "PUT",
            body: formDate
        });
    }

    return (
        <div>
            <BookForm handleSubmit={handleSubmit}/>
        </div>
    );
};

export default EditBook;