import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import withAlert from '../Shared/hoc/withAlert';
import Button from 'react-bootstrap/Button';

const DeleteBook = (props) => {
    const {author, title, _id} = props.location; 
    return (
        <div>
            <h2>Are you sure you want to remove {title} by {author} from the library?</h2>
            <div className="row">
                <Button  className="col-4 mx-3" onClick={async ()=>{
                    let res = await fetch(`/book/${_id}`, {method: 'DELETE'});
                    if(res.status === 200){
                        props.showAlert({message: 'Book Deleted!', variant: 'success'});            
                    } else {
                        props.showAlert({message: 'There was an error deleting your book', variant: 'danger'})
                    }
                }}>Yes</Button>
                <LinkContainer className="col-4 mx-3" style={{cursor: "pointer"}} to={{
                    pathname: '/',
                }}>
                    <Button>No</Button>
                </LinkContainer>
            </div>
        </div>
    );
};

export default withAlert(DeleteBook);