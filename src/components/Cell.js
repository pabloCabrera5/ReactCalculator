import React, { Component } from 'react';

import PropTypes from 'prop-types';
import '../styles/cell.css';
import { contentCells } from "../constants";


export class Cell extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    _handleClick = (e) => {
        this.props.sendValue(e.target.value)
    }

    render() {
        return (
            <div className='calculatorCells'>
                <div className='numbers'>
                    {this.props.contentCells.map(value => (
                        <button key={value.id}
                            type='button'
                            onClick={this._handleClick}
                            id={value.id}
                            value={value.value}>
                            {value.value}
                        </button>
                    ))}
                </div>
                <div className='operators'>
                    {this.props.operators.map(value => (
                        <button key={value.id}
                            type='button'
                            onClick={this._handleClick}
                            id={value.id}
                            value={value.value}>
                            {value.value}
                        </button>
                    ))}
                </div>

            </div>

        )
    }
}

Cell.propTypes = {
    contentCells: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired
}
Cell.defaultProps = {
    contentCells
}