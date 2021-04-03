//TODO Click buttons and make them appear on screen

const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('#screen');
screen.textContent = '0';

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {

        //if you are clicking a number (not including period) and the number on the screen is 0, it changes the number
        if ((e.target.className == 'button number') && (screen.textContent == '0') && (e.target.id != 'point')){
            screen.textContent = e.target.value;
        //if the number on the screen is not 0, it appends the number to the end of the sequenece (there can only be 9 numbers max on screen)
        }else if ((e.target.className == 'button number') && (screen.textContent != '0') && (screen.textContent.length < 9)){
            screen.textContent += e.target.value;
        //if you are clicking period and the number on the screen is 0, it changes the number to 0.
        }else if ((e.target.id == 'point') && (screen.textContent == '0')){
            screen.textContent = "0.";
        //adds period when clicked, but can only add it one time.
        }else if ((e.target.id == 'point') && ((screen.textContent.split('.').length - 1) < 1)){
            screen.textContent += e.target.value;
        //returns everything back to 0 NEEDS TO CHANGE TO CLEAR VARIABLES
        }else if (e.target.id == 'clear'){
            screen.textContent = '0';
        //deletes the last things added to the screen
        }else if (e.target.id == 'delete'){
            screen.textContent = screen.textContent.slice(0, -1);
        }

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