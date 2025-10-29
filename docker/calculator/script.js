function appendToDisplay(value) {
    const display = document.getElementById('display');
    
    // Prevent multiple operators in a row
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/'];
    
    if (operators.includes(value) && operators.includes(lastChar)) {
        return; // Don't add operator if last character is already an operator
    }
    
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    const display = document.getElementById('display');
    const expression = display.value;
    
    try {
        // Safer calculation using Function constructor instead of eval
        const result = Function('"use strict"; return (' + expression + ')')();
        
        // Check for valid number result
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        // Round to avoid floating point precision issues
        display.value = Math.round(result * 100000000) / 100000000;
    } catch(e) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});
