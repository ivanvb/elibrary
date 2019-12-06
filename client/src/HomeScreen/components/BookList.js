import React, {useContext} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {UserContext} from '../../Shared/context/User.context';
import {withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
const BookList = (props) => {
    let [user] = useContext(UserContext);

    function nextPath(path) {
        props.history.push(path);
    }
    let booklist = props.books.map((book, index) =>{
        return (
            <Card key={index} className="col-sm-6 col-md-4 col-lg-3">
                <Card.Body>
                    <LinkContainer style={{cursor: "pointer"}} to={{
                        pathname: '/details',
                        _id: book._id
                    }}>
                        <div className="mb-3">
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>by {book.author}</Card.Text>
                        </div>
                    </LinkContainer>
                    {user._id === book.aggregator &&
                    <LinkContainer style={{cursor: "pointer"}} to={{
                        pathname: '/editbook/',
                        _id: book._id
                    }}>
                        <Card.Link>Edit book</Card.Link>
                    </LinkContainer>}
                    {user._id === book.aggregator && 
                    <LinkContainer style={{cursor: "pointer"}} to={{
                        pathname: '/delete/',
                        _id: book._id,
                        author: book.author,
                        title: book.title
                    }}>
                        <Card.Link>Delete Book</Card.Link>    
                    </LinkContainer>}
                </Card.Body>
            </Card>
        )
    })
    return (
        <div className="row">
            {booklist}
        </div>
    );
};

export default withRouter(BookList);