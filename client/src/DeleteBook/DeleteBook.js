import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

const DeleteBook = (props) => {
    console.log(props.location)
    const {author, title, _id} = props.location; 
    return (
        <div>
            <h2>Are you sure you want to remove {title} by {author} from the library?</h2>
            <button onClick={async ()=>{
                let res = await fetch(`/book/${_id}`, {method: 'DELETE'});
                if(res.status === 200){
                    console.log("deleted")
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

export default DeleteBook;