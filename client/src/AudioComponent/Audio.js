import React from 'react';

const Audio = (props) => {
    return (
        <div>
            <audio controls src={props.url}/>
        </div>
    );
};

export default Audio;