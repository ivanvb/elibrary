import React from 'react';

const Audio = (props) => {
    console.log(props.url)
    return (
        <div>
            <audio controls src={props.url}/>
        </div>
    );
};

export default Audio;