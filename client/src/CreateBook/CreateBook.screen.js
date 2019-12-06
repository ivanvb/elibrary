import React from 'react';
import BookForm from '../Shared/forms/Book.form';
import withAlert from '../Shared/hoc/withAlert';

const CreateBook = (props) => {

    async function handleSubmit(formData){
        let resp = await fetch('/book/',{
            method: 'POST',
            body: formData
        });

        if(resp.status === 200){
            props.showAlert({message: 'Book created!', variant: 'success'});
        } else {
            props.showAlert({message: 'There was an error creating this book!', variant: 'danger'});
        }
    }

    return (
        <div>
           <BookForm handleSubmit={handleSubmit}/> 
        </div>
    );
};

export default withAlert(CreateBook);