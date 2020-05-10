// Function to know if the data is a simbol operation
const _isOperator = (value) => {
    return value === '+' || value === '-' || value === '/' || value === '*';
}
// Function to know if the data is a number
const _isNumber = (value) => {
    return !isNaN(value);
}
// Function to know if the data is a number diferente from 0 ( but have to be a number otherwise false sure)
const _isNumberDiferentFrom0 = (value) => {
    return !isNaN(value) && !(value == '0' && !isNaN(value));
}

// Function to know if the data is a dot
const _isDot = (value) => {
    return value === '.'
}

// Function to know if the data is an equal
const _isEqual = (value) => {
    return value === '='
}

// Function to evaluate and calculate the final result of the operation
const evaluate = (state) => {
    let checkResult = state.formula;
    // If the last element is an operator we remove it
    if (_isOperator(checkResult[checkResult.length - 1])) {
        checkResult = checkResult.slice(0, -1);
    }
    // If we have double minus its equal to a plus
    if (checkResult.includes('--')) {
        checkResult = checkResult.replace('--', '+')
    }
    try {
        // then we evalutate the result and send the data update
        let res = eval(checkResult).toFixed(2);
        return {
            result: res,
            formula: checkResult + '=' + res,
            calculated: true,
            float: false,
            prevValue: ''
        }
    } catch (error) {
        // otherwise we return an error
        return {
            result: 'NaN',
            calculated: true
        }
    }
}

const evaluatedAndContinue = (state, data) => {
    // If we have something calculated yet and we press and operator button, we continue operating with the result of the previous operation
    if (_isOperator(data)) {
        return {
            formula: state.result + data,
            result: data,
            calculated: false,
            prevValue: state.result
        }
    }
    // If we have something calculated yet and we pulse a number, we reset all with this number (!= 0)
    else if (_isNumberDiferentFrom0(data)) {
        return {
            formula: data,
            result: data,
            calculated: false
        }
    }
    // If we have something calculated yet and we pulse a number, we reset all with this 0 and empty
    else if (_isNumber(data)) {
        return {
            formula: '',
            result: data,
            calculated: false
        }
    }
    // If we have something calculated yet and we pulse the dot, we reset all with 0.
    else if (_isDot(data)) {
        return {
            formula: '0' + data,
            result: '0' + data,
            float: true,
            calculated: false
        }
    }
}

const initialize = (state, data) => {
    // case is a number we set the number
    if (_isNumber(data)) {
        return {
            formula: data,
            result: data
        }
    }
    // case its a dot we set to 0.
    else if (_isDot(data)) {
        return {
            formula: '0' + data,
            result: state.result + data,
            float: true
        }
    }
}

const operateWithNumber = (state, data) => {
    // and we press a operator before
    if (_isOperator(state.result)) {
        return {
            prevValue: state.formula, // we save the value in case they press multiples times 0
            formula: state.formula + data,
            result: data
        }
    }
    // if we press a number (1) and the value in the result is != from 0 (1 ->11) or its a dot (. ->0.1)
    else if (_isNumberDiferentFrom0(state.result) || _isDot(state.result)) {
        return {
            formula: state.formula + data,
            result: state.result + data
        }
    }
    // the value in the result its a zero
    else {
        return {
            formula: state.prevValue + data, // we use the prevValue stored
            result: data
        }
    }
}
const operateWithDot = (state, data) => {
    // if we have pressed before an operator , we want a dot (.) who is like if we have an (0.) (0.X === .X)
    if (_isOperator(state.result)) {
        return {
            formula: state.formula + data,
            result: data,
            float: true
        }
    }
    // we have a number and we set the dot
    else {
        return {
            formula: state.formula + data,
            result: state.result + data,
            float: true
        }
    }
}
const operateWithOperator = (state, data) => {
    // if we have a number in the result we replace it and save the prevValue in case we press multiples times an operator and have to update it
    // we let introduce another float number
    if (_isNumber(state.result)) {
        return {
            prevValue: state.formula,
            formula: state.formula + data,
            result: data,
            float: false
        }
    }
    // if we pressed an operator multiples time we only update the result and the formula with the corresponding last operator
    else {
        return {
            formula: state.prevValue + data,
            result: data,
            float: false
        }
    }
}

export {
    _isOperator,
    _isNumber,
    _isNumberDiferentFrom0,
    _isDot,
    _isEqual,
    evaluate,
    evaluatedAndContinue,
    initialize,
    operateWithNumber,
    operateWithDot,
    operateWithOperator
}
