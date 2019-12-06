import React, {useState} from 'react';
import ReadBook from '../ReadBook/ReadBook.screen';
import Audio from '../AudioComponent/Audio';

const BookDetails = (props) => {
    const {_id} = props.location;
    const [book, setBook] = useState({});
    
    if(!book.title){
        fetch(`/book/${_id}`)
        .then(data =>{
            if(data.status === 200){
                data.json()
                .then(json =>{
                    setBook({...json.book})
                })
            }
        });
    }
    
    return (
        <>
            {book.title &&
            <div>
                <h2>{book.title} written by {book.author}</h2>
                <ReadBook _id={_id}/>
                <Audio url={`/book/audio/${_id}`}/>
            </div>}
        </>
    );
};

export default BookDetails;