//TODO Click buttons and make them appear on screen

const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('#screen');
let firstNumber = 0;
let secondNumber = 0;

screen.textContent = '0';

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {

        //if you are clicking a number (not including period) and the number on the screen is 0, it changes the number
        if ((e.target.className == 'button number') && (screen.textContent == '0') && (e.target.id != 'point')){
            screen.textContent = e.target.value;
        //if the number on the screen is not 0, it appends the number to the end of the sequenece (there can only be 9 numbers max on screen)
        }else if ((e.target.className == 'button number') && (screen.textContent != '0') && (screen.textContent.length < 8)){
            screen.textContent += e.target.value;
        //if you are clicking period and the number on the screen is 0, it changes the number to 0.
        }else if ((e.target.id == 'point') && (screen.textContent == '0')){
            screen.textContent = "0.";
        //adds period when clicked, but can only add it one time.
        //the split function counts how many elements were made when you split the string at the period
        //if the length is 2 (two parts) - 1 = 1, that means that there is already a period there
        }else if ((e.target.id == 'point') && ((screen.textContent.split('.').length - 1) < 1)){
            screen.textContent += e.target.value;
        //returns everything back to 0 
        //NEEDS TO BE ABLE TO CLEAR VARIABLES
        }else if (e.target.id == 'clear'){
            screen.textContent = '0';
            firstNumber = 0;
            secondNumber = 0;
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
            firstNumber = parseFloat(screen.textContent);
            
        }
        
        //TODO - add activator for operator

        //if there is nothing on the screen, it puts 0 back
        if (screen.textContent == ''){
            screen.textContent = '0';
        }
    });
});

//TODO Add function
//TODO Subtract function
//TODO Multiply function
//TODO Divide function
//TODO Operate function --> Takes two numbers and an operator and calls ones of the functions above