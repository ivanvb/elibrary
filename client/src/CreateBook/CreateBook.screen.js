import React from 'react';
import BookForm from '../Shared/forms/Book.form';

const CreateBook = () => {

    async function handleSubmit(formData){
        let resp = await fetch('/book/',{
            method: 'POST',
            body: formData
        });

        console.log(resp.status);
    }

    return (
        <div>
           <BookForm handleSubmit={handleSubmit}/> 
        </div>
    );
};

export default CreateBook;