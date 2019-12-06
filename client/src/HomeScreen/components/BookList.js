import React, {useContext} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {UserContext} from '../../Shared/context/User.context';
import {withRouter} from 'react-router-dom';

const BookList = (props) => {
    let [user] = useContext(UserContext);

    function nextPath(path) {
        props.history.push(path);
    }
    let booklist = props.books.map((book, index) =>{
        return (
            <div className="row" key={index} >
                <LinkContainer style={{cursor: "pointer"}} to={{
                    pathname: '/details/',
                    _id: book._id
                }}>
                    <div className="col">{book.title} by {book.author}</div>
                </LinkContainer>

                {user._id === book.aggregator && 
                <LinkContainer style={{cursor: "pointer"}} to={{
                    pathname: '/editBook/',
                    _id: book._id
                }}>
                    <button onClick={()=>{nextPath('/editbook')}}>edita</button>
                </LinkContainer>}

                {user._id === book.aggregator && 
                <LinkContainer style={{cursor: "pointer"}} to={{
                    pathname: '/delete/',
                    _id: book._id,
                    author: book.author,
                    title: book.title
                }}><button>delete</button></LinkContainer>}
            </div>
        )
    })
    return (
        <div>
            {booklist}
        </div>
    );
};

export default withRouter(BookList);