add = (a, b) => (a + b);
subtract = (a, b) => (a - b);
multiply = (a, b) => (a * b);
divide = (a, b) => (a / b);

operate = (a, b, operator) => {
    if (operator == 'add'){
        return add(a,b);
    }else if (operator == 'subtract'){
        return subtract(a,b);
    }else if (operator == 'multiply'){
        return multiply(a,b);
    }else if (operator == 'divide'){
        return divide(a,b);
    }
}

const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('#screen');

let firstNumber;
let secondNumber;
let currentOperator;
let newNumbersOnScreen = true;
screen.textContent = '0';

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {

        //if you are clicking a number (not including period) and the number on the screen is 0, it changes the number
        if ((e.target.className == 'button number') && (newNumbersOnScreen == true) && (e.target.id != 'point')){
            screen.textContent = e.target.value;
            newNumbersOnScreen = false;
        //if the number on the screen is not 0, it appends the number to the end of the sequenece (there can only be 9 numbers max on screen)
        }else if ((e.target.className == 'button number') && (newNumbersOnScreen == false) && (screen.textContent.length < 8)){
            screen.textContent += e.target.value;
        //if you are clicking period and the number on the screen is 0, it changes the number to 0.
        }else if ((e.target.id == 'point') && (screen.textContent == '0')){
            screen.textContent = "0.";
            newNumbersOnScreen = false;
        //adds period when clicked, but can only add it one time.
        //the split function counts how many elements were made when you split the string at the period
        //if the length is 2 (two parts) - 1 = 1, that means that there is already a period there
        }else if ((e.target.id == 'point') && ((screen.textContent.split('.').length - 1) < 1)){
            screen.textContent += e.target.value;
            newNumbersOnScreen = false;
        //returns everything back to 0 
        }else if (e.target.id == 'clear'){
            screen.textContent = '0';
            firstNumber = undefined;
            secondNumber = undefined;
            currentOperator = undefined;
            newNumbersOnScreen = true;
        //deletes the last things added to the screen
        }else if (e.target.id == 'delete'){
            screen.textContent = screen.textContent.slice(0, -1);
        //add the negative sign to the screen if it isn't there or removes it
        }else if (e.target.id == 'negative'){
            if (screen.textContent.slice(0,1) != '-'){
                screen.textContent = '-' + screen.textContent;
            }else{
                screen.textContent = screen.textContent.slice(1);
            }
        //TODO - add function for percentage button
        }else if (e.target.id == 'percent'){
            
        }else if (e.target.className == 'button operator'){
            if (e.target.id != currentOperator){
                if ((firstNumber == undefined) && (secondNumber == undefined)){
                    firstNumber = parseFloat(screen.textContent);
                }else if((firstNumber != undefined) && (secondNumber == undefined)){
                    secondNumber = parseFloat(screen.textContent);
                    screen.textContent = operate(firstNumber, secondNumber, currentOperator);
                    console.log(firstNumber, secondNumber, currentOperator);                
                    firstNumber = parseFloat(screen.textContent);
                    secondNumber = undefined;
                }
                if (e.target.id != 'equals') {
                    currentOperator = e.target.id;
                }
                newNumbersOnScreen = true;   
            }
        }
        
        //TODO - add activator for operator

        //if there is nothing on the screen, it puts 0 back
        if (screen.textContent == ''){
            screen.textContent = '0';
        } else if (screen.textContent == 'Infinity'){
            screen.textContent = 'ERROR'
        }
    });
});




//TODO Operate function --> Takes two numbers and an operator and calls ones of the functions above