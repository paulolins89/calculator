//TODO Click buttons and make them appear on screen

const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('#screen');
screen.textContent = '0';

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if ((e.target.className == 'button number') && (screen.textContent == '0')){
            screen.textContent = e.target.value;
        }else if ((e.target.className == 'button number') && (screen.textContent != '0')){
            screen.textContent += e.target.value;
        }
    });
});

//TODO Add function
//TODO Subtract function
//TODO Multiply function
//TODO Divide function
//TODO Operate function --> Takes two numbers and an operator and calls ones of the functions above