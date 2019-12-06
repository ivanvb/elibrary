import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import withAlert from '../Shared/hoc/withAlert';

const DeleteBook = (props) => {
    const {author, title, _id} = props.location; 
    return (
        <div>
            <h2>Are you sure you want to remove {title} by {author} from the library?</h2>
            <button onClick={async ()=>{
                let res = await fetch(`/book/${_id}`, {method: 'DELETE'});
                if(res.status === 200){
                    props.showAlert({message: 'Book Deleted!', variant: 'success'});            
                } else {
                    props.showAlert({message: 'There was an error deleting your book', variant: 'danger'})
                }
            }}>Yes</button>
            <LinkContainer style={{cursor: "pointer"}} to={{
                pathname: '/',
            }}>
                <button>No</button>
            </LinkContainer>
        </div>
    );
};

export default withAlert(DeleteBook);