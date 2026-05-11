/**
 * Calculator Application
 * A secure, accessible calculator with keyboard support and calculation history
 */

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
let previousCalculation = '';

/**
 * Appends a number to the display
 * @param {string} num - The number to append (0-9 or '.')
 */
function appendNumber(num) {
    const currentValue = display.value;
    
    // Prevent multiple leading zeros
    if (currentValue === '0' && num === '0') return;
    
    // Replace leading zero with new number (unless it's a decimal point)
    if (currentValue === '0' && num !== '.') {
        display.value = num;
        return;
    }
    
    // Prevent multiple decimal points in the same number
    if (num === '.' && hasMultipleDecimals(currentValue)) {
        return;
    }
    
    display.value += num;
}

/**
 * Checks if adding another decimal point would be invalid
 * @param {string} value - The current display value
 * @returns {boolean} - True if there's already a decimal in the current number
 */
function hasMultipleDecimals(value) {
    const parts = value.split(/[+\-*/]/);
    const lastPart = parts[parts.length - 1];
    return lastPart.includes('.');
}

/**
 * Appends an operator to the display
 * Prevents consecutive operators
 * @param {string} op - The operator (+, -, *, /)
 */
function appendOperator(op) {
    const currentValue = display.value;
    
    if (!currentValue) return;
    
    const lastChar = currentValue[currentValue.length - 1];
    const operators = ['+', '-', '*', '/'];
    
    // Don't add operator if last character is already an operator
    if (operators.includes(lastChar)) return;
    
    // Handle negative numbers
    if (op === '-' && lastChar === '-') return;
    
    display.value += op;
}

/**
 * Safely evaluates a mathematical expression
 * Prevents code injection and handles floating-point errors
 * @param {string} expression - The mathematical expression to evaluate
 * @returns {number|string} - The result or error message
 */
function safeEvaluate(expression) {
    try {
        // Validate that expression only contains allowed characters
        if (!/^[\d+\-*/.()\s]*$/.test(expression)) {
            return 'Invalid input';
        }
        
        // Replace display symbols with actual operators
        const cleanExpression = expression
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-');
        
        // Check for division by zero
        if (/\/\s*0(?![\d])/g.test(cleanExpression)) {
            return 'Cannot divide by zero';
        }
        
        // Use Function constructor instead of eval for safer evaluation
        const result = Function('"use strict"; return (' + cleanExpression + ')')();
        
        // Handle invalid calculations
        if (typeof result !== 'number' || !isFinite(result)) {
            return 'Invalid calculation';
        }
        
        // Fix floating-point errors (e.g., 0.1 + 0.2 = 0.30000000000000004)
        return Math.round(result * 100000000) / 100000000;
    } catch (error) {
        return 'Invalid expression';
    }
}

/**
 * Performs the calculation when the equals button is pressed
 */
function calculate() {
    const expression = display.value;
    
    if (!expression || expression === '0') return;
    
    const result = safeEvaluate(expression);
    
    if (typeof result === 'number') {
        previousCalculation = `${expression} = ${result}`;
        historyDisplay.textContent = previousCalculation;
        display.value = result;
    } else {
        display.value = result;
        historyDisplay.textContent = '';
    }
}

/**
 * Clears the display and history
 */
function clearDisplay() {
    display.value = '0';
    historyDisplay.textContent = '';
    previousCalculation = '';
}

/**
 * Deletes the last character from the display
 */
function deleteLast() {
    const currentValue = display.value;
    
    if (currentValue.length > 1) {
        display.value = currentValue.slice(0, -1);
    } else {
        display.value = '0';
    }
}

/**
 * Handles keyboard input
 */
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Number keys (0-9)
    if (/^[0-9]$/.test(key)) {
        appendNumber(key);
        event.preventDefault();
    }
    // Decimal point
    else if (key === '.') {
        appendNumber('.');
        event.preventDefault();
    }
    // Operators
    else if (key === '+') {
        appendOperator('+');
        event.preventDefault();
    }
    else if (key === '-') {
        appendOperator('-');
        event.preventDefault();
    }
    else if (key === '*') {
        appendOperator('*');
        event.preventDefault();
    }
    else if (key === '/') {
        appendOperator('/');
        event.preventDefault();
    }
    // Calculate
    else if (key === 'Enter' || key === '=') {
        calculate();
        event.preventDefault();
    }
    // Clear
    else if (key === 'Escape') {
        clearDisplay();
        event.preventDefault();
    }
    // Backspace
    else if (key === 'Backspace') {
        deleteLast();
        event.preventDefault();
    }
});

// Initialize display
window.addEventListener('load', () => {
    display.value = '0';
});