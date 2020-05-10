import React from 'react';
import '../styles/formula.css'


export const Formula = (props) => {
    return (
        <div className='formula'>
            <p>{props.formula}</p>
        </div>
    )
}