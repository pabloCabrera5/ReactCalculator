import React, { Component } from 'react';

import './App.css';
import { Cell } from './components/Cell';
import { Result } from './components/Result';
import { Formula } from './components/Formula';
import { contentCells } from './constants';
import {
  _isNumber, _isNumberDiferentFrom0, _isOperator, _isDot, _isEqual,
  initialize, evaluate, evaluatedAndContinue,
  operateWithNumber, operateWithDot, operateWithOperator
} from "./utils";

class App extends Component {
  state = {
    result: '0',
    formula: '',
    prevValue: '',
    calculated: false,
    float: false,
  }


  _receiveValue = (data) => {
    let state = this.state;
    // when we click the button AC, we reset all
    if (data === 'AC') {
      state = this._resetValues();
    }
    // when we want to have the result
    else if (_isEqual(data) && !state.calculated) {
      state = evaluate(state);
    }
    // if we already have a result but want to continue operating ( avoiding recalculating the same multiples time if we press = )
    else if (!_isEqual(data) && state.calculated) {
      console.log('no calcula , but oper')
      // to not call without needed to the evaluatefunction
      state = evaluatedAndContinue(state, data);
    }
    // We havent done any operation yet (avoid enter here if we press multiples times = )
    else if (!_isEqual(data)) {
      // the first time we press a button
      if ((state.formula === '' || state.formula === '0') && state.result === '0') {
        state = initialize(state, data);
      }
      // we have already some data in the formula and result
      else {
        // if its a number ex: 1
        if (_isNumber(data)) {
          state = operateWithNumber(state, data);
        }
        // if its a dot and we havent set any dot/float number yet
        else if (_isDot(data) && !state.float) {
          state = operateWithDot(state, data);
        }
        // if its an operator (*)
        else if (_isOperator(data)) {
          state = operateWithOperator(state, data);
        }
      }
    }
    this.setState(state)
  }

  _resetValues = () => {
    return {
      result: '0',
      formula: '',
      float: false,
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='calculator'>
            <Formula formula={this.state.formula}></Formula>
            <Result result={this.state.result}></Result>
            <Cell
              sendValue={this._receiveValue}
              contentCells={contentCells.contentCells}
              operators={contentCells.operators} />
          </div>

        </header>
      </div>
    );
  }
}

export default App;
