/*DEFINING INITIAL FUNCTIONS*/
add = (a, b) => (a + b);
subtract = (a, b) => (a - b);
multiply = (a, b) => (a * b);
divide = (a, b) => (a / b);
elevate = (a, b) => Math.pow(a, b);
 
operate = (a, b, operator) => {
   if (operator == '+'){
       return add(a,b);
   }else if (operator == '-'){
       return subtract(a,b);
   }else if (operator == '*'){
       return multiply(a,b);
   }else if (operator == '/'){
       return divide(a,b);
   }else if (operator == '^'){
       return elevate(a,b);
   }
}
 
calculator = (key) => {
   //FUNCTIONS FOR FILLING INFORMATION ON THE SCREEN
   //if you are clicking a number (not including period) and the number on the screen is 0, it changes the number
   if ((parseFloat(key) >= 0 && parseFloat(key) <= 9) && (newNumbersOnScreen == true) && (key != '.')){
       screen.textContent = parseFloat(key);
       newNumbersOnScreen = false;
       operatorButtons.forEach((button) => button.disabled = false);
       allOperators = ['+', '-', '*', '/', '^', 'Enter'];
   //if the number on the screen is not 0, it appends the number to the end of the sequenece (there can only be 9 numbers max on screen)
   }else if ((parseFloat(key) >= 0 && parseFloat(key) <= 9) && (newNumbersOnScreen == false) && (screen.textContent.length < 8)){
       screen.textContent += parseFloat(key);
   //if you are clicking period and the number on the screen is 0, it changes the number to 0.
   }else if ((key == '.') && (newNumbersOnScreen == true)){
       screen.textContent = "0.";
       newNumbersOnScreen = false;
       operatorButtons.forEach((button) => button.disabled = false);
       allOperators = ['+', '-', '*', '/', '^', 'Enter'];
   //adds period when clicked, but can only add it one time.
   //the split function counts how many elements were made when you split the string at the period
   //if the length is 2 (two parts) - 1 = 1, that means that there is already a period there
   }else if ((key == '.') && ((screen.textContent.split('.').length - 1) < 1)){
       screen.textContent += key;
       newNumbersOnScreen = false;
   //returns everything back to 0
   }else if (key == 'Escape'){
       screen.textContent = '0';
       firstNumber = secondNumber = currentOperator = undefined;
       newNumbersOnScreen = true;
   //deletes the last things added to the screen
   }else if (key == 'Backspace' && newNumbersOnScreen == false){
       screen.textContent = screen.textContent.slice(0, -1);
   //add the negative sign to the screen if it isn't there or removes it
   }else if (key == 'n'){
       if (screen.textContent.slice(0,1) != '-'){
           screen.textContent = '-' + screen.textContent;
       }else{
           screen.textContent = screen.textContent.slice(1);
       }
  
   //CALCULATION SEQUENCE AFTER AN OPERATOR IS CHOSEN
   }else if (allOperators.includes(key)){
       //establishes the first name in the calc (what is on the screen)
       if (firstNumber == undefined){
           firstNumber = parseFloat(screen.textContent);
           //calculates after the second number is established on the screen and another operator is clicked
       }else if(firstNumber != undefined){ 
           secondNumber = parseFloat(screen.textContent);
           screen.textContent = operate(firstNumber, secondNumber, currentOperator);
           firstNumber = operate(firstNumber, secondNumber, currentOperator);               
           secondNumber = undefined;
       }  
       //all operators work like the equals but they have an extra function which is add to the operate function
       //since equal just shows the answer, we need to check if it  was clicked
       // if equal was not clicked, just establish new operator, and disable all the others from being clicked.
       if (key != 'Enter'){
           currentOperator = key;
           operatorButtons.forEach((button) => button.disabled = true);
           allOperators = [];
       // if equal was clicked, revert to initial state (firstNumber not defined, waiting for a new operator to continue calculation).
       }else{
           currentOperator = key;
           firstNumber = undefined;
           }
       newNumbersOnScreen = true;  
   }
 
   //ADJUSTS WHAT'S ON THE SCREEN IN SPECIFIC SITUATIONS
   //if there is nothing on the screen, it puts 0 back
   if (screen.textContent == ''){
       screen.textContent = '0';
   //if there is a division by 0, it displays an error and restores everything to default values
   }else if (screen.textContent == 'Infinity' || screen.textContent == 'NaN'){
       screen.textContent = 'ERROR'
       firstNumber = secondNumber = currentOperator = undefined;
       newNumbersOnScreen = true;
   //adjusts what's on the screen depend on how big the number is
   }else if (screen.textContent.toString().length > 8){
       if ((parseFloat(screen.textContent) > 999999) || (parseFloat(screen.textContent) < 0.000001)){
           screen.textContent = parseFloat(screen.textContent).toExponential(3);
       //if the length of the string is bigger than what the screen allows but is still outside of the
       //range established before, it is because it has a decimal point and it is increasing the
       // size of te number. in that case, it counts the length of the whole number before the .
       // and adjusts the length of the digits after
       }else if ((screen.textContent.split('.').length - 1) == 1){
           let wholeLength = screen.textContent.split('.')[0].length;
           screen.textContent = parseFloat(screen.textContent).toFixed(7 - wholeLength);
       }
   }
  
}
 
//DEFINING ALL THE SELECTORS
const buttons = document.querySelectorAll('.button');
const operatorButtons = document.querySelectorAll('.operator')
const screen = document.querySelector('#screen');
 
//DEFINING INITIAL VARIABLESg
//these variables will be used to operate
let firstNumber;
let secondNumber;
let currentOperator;
let allOperators;
 
//this variable is used to keep hold the numbers on the screen, and when new numbers are added, they
//substitute the one that was on the screen, without adding those number to the old one.
let newNumbersOnScreen = true;
screen.textContent = '0';
 
 
//EVENT LISTENERS
window.addEventListener('keydown', (e) => {
   if (e.key == '='){
       calculator('Enter');
       console.log('Enter');
   }else{
       calculator(e.key);
       console.log(e.key);
   }
   e.preventDefault();
});
 
buttons.forEach((button) => button.addEventListener('click', (e) => {
   calculator(e.currentTarget.id);
   console.log(e.currentTarget.id);
}));
