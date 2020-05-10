import React from 'react';
import '../styles/result.css'


export const Result = (props) => {
    return (
        <div className='result'>
            <p>{props.result}</p>
        </div>
    )
}