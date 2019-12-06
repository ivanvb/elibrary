import React from 'react';
import BookForm from '../Shared/forms/Book.form';
import withAlert from '../Shared/hoc/withAlert';

const EditBook = (props) => {
    async function handleSubmit(formDate){
        let req = await fetch(`/book/${props.location._id}`, {
            method: "PUT",
            body: formDate
        });

        if(req.status === 200){
            props.showAlert({message: 'The book has been edited!', variant: 'success'})
        } else {
            props.showAlert({message: 'There was an error editing the book', variant: 'danger'})
        }
    }

    return (
        <div>
            <BookForm handleSubmit={handleSubmit}/>
        </div>
    );
};

export default withAlert(EditBook);