// const allclear=() =>{
//     const display = document.getElementById(".operator");
//     display.innertext="0";
// }
// const result=allclear()
// console.log(result)

document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    
    function allclear() {
        display.value = '';
    }


    function calculate() {
        try {
            display.value = eval(display.value);
            display.value = result;
    
            // Send the result to the server
            fetch('http://localhost:3000/save-calculation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ result: result.toString() })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch(error => console.error("Error saving calculation:", error));
                    
        } catch (error) {
            display.value = 'Error';
            
        }
    }    

    
    document.addEventListener('keydown', function (event) {
        const key = event.key;

        if (key >= '0' && key <= '9' || key ==='.') {
            // Numbers (0-9)
            display.value += key;
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            // Operators (+, -, *, /)
            display.value += key;
        } else if (key === 'Enter') {
            // Enter key to evaluate the expression
            calculate();
        } else if (key === 'Backspace') {
            // Backspace to delete the last character
            display.value = display.value.slice(0, -1);
        } else if (key === 'Escape') {
            // Escape key to clear the input
            allclear();
        }else if(key === '%'){
            display.value += '%'
        }

        // Update the display
        display.value = display.value;
    });
});    
calculate()