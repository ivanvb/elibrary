import React, {useState} from 'react';
import ReadBook from '../ReadBook/ReadBook.screen';
import Audio from '../AudioComponent/Audio';
import Button from 'react-bootstrap/Button';

const BookDetails = (props) => {
    const {_id} = props.location;
    const [book, setBook] = useState({});
    const [bookText, setShowBookText] = useState({show:false})
    const [bookAudio, setShowBookAudio] = useState({show:false})
    
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
                <div className="row mb-3">
                    {!bookAudio.show && <Button onClick={()=>{setShowBookAudio({show:true})}}>Listen to book</Button>}
                    {bookAudio.show && <Audio url={`/book/audio/${_id}`}/>}
                </div>
                <div className="row">
                    {!bookText.show && <Button onClick={()=>{setShowBookText({show: true})}}>Read Book</Button>}
                    {bookText.show &&  <ReadBook _id={_id}/>}
                </div>
            </div>}
        </>
    );
};

export default BookDetails;