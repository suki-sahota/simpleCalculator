/*
 * Author: Suki Sahota
 * Description: Simple JavaScript Calculator
 */
window.onload = function() {

  // Create variables for calculator
  let firstNumber = "";
  let secondNumber = "";
  let operator = "";
  let result = 0;
  let isOperatorSelected = false;
  let isCalculated = false;

  // Create variables for document text elements to avoid parsing HTML document repeatedly
  let firstNumberText = document.getElementById("first-number");
  let operatorText = document.getElementById("operator");
  let secondNumberText = document.getElementById("second-number");
  let resultText = document.getElementById("result");
  let numbers = document.getElementsByClassName("number");
  let operators = document.getElementsByClassName("operator");
  let equal = document.querySelector(".equal");
  let clear = document.querySelector(".clear");

  // Function to reset calculator values to neutral state
  function resetCalculator() {
    // Clear "calculator memory"
    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = 0;
    isOperatorSelected = false;
    isCalculated = false;

    // Clear calculator's display
    while (firstNumberText.firstChild) firstNumberText.removeChild(firstNumberText.firstChild);
    while (operatorText.firstChild) operatorText.removeChild(operatorText.firstChild);
    while (secondNumberText.firstChild) secondNumberText.removeChild(secondNumberText.firstChild);
    while (resultText.firstChild) resultText.removeChild(resultText.firstChild);
  }

  // Makes calculator ready for use after page initially loads
  resetCalculator();

  // This function executes when user clicks on a number
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function() {
        // Reset calculator to neutral state
        if (isCalculated) {
          resetCalculator();
        }
  
        // If isOperatorSelected is true, capture user selection as part of secondNumber
        if (isOperatorSelected) {
          // Add string version of selected number to secondNumber variable
          secondNumber += this.value;
          // Show updated secondNumber on calculator's display
          secondNumberText.innerHTML = secondNumber;
        } 
        // If isOperatorSelected is false, capture user selection as part of firstNumber
        else {
          // Add string version of selected number to firstNumber variable
          firstNumber += this.value;
          // Show updated firstNumber on calculator's display
          firstNumberText.innerHTML = firstNumber;
        }
    });
  }

  // This function executes when user clicks on an operator symbol
  for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function() {
      // Do not allow user to select operator if firstNumber is empty
      if (firstNumber === "") {
        return;
      }

      // Operator symbol after equal sign -> use result as firstNumber and clear rest
      if (isCalculated) {
        firstNumber = result;
        firstNumberText.innerHTML = firstNumber;
        secondNumber = "";
        secondNumberText.innerHTML = "";
        resultText.innerHTML = "";
        isCalculated = false;
      }

      // Operator symbol after secondNumber, but before equal sign -> conduct prev operation, use result as firstNumber, and clear rest (except isOperatorSelected)
      if (secondNumber != "") {
        equal.click();
        firstNumber = result;
        firstNumberText.innerHTML = firstNumber;
        secondNumber = "";
        secondNumberText.innerHTML = "";
        resultText.innerHTML = "";
        isCalculated = false;
      }

      // Update isOperatorSelected to true so we know firstNumber is complete
      isOperatorSelected = true;
      // Set operator variale to string version of selected operator
      operator = this.value;
      // Show the operator symbol selected on calculator's display
      operatorText.innerHTML = this.textContent;
    });
  }

  // This function executes when user clicks on the equal sign
  equal.addEventListener("click", function() {
    // Do not allow user to select equal sign if firstNumber is empty
    if (firstNumber === "") {
      return;
    }

    // Set result to firstNumber if equal pressed before operator
    if (!isOperatorSelected) {
      result = firstNumber;
      resultText.innerHTML = result;
      isCalculated = true;
      return;
    }

    // Use firstNumber as both numbers if secondNumber empty
    if (secondNumber === ""){
      secondNumber = firstNumber;
      secondNumberText.innerHTML = secondNumber;
    }

    // Equal pressed twice in a row
    if (isCalculated) {
      firstNumber = result;
      firstNumberText.innerHTML = firstNumber;
    }

    // Update isCalculated to keep track if a calculation has occurred
    isCalculated = true;
    // Type cast our numbers to actual integers
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
    // Determine which operation to use on our two numbers
    if (operator === "plus") {
      result = firstNumber + secondNumber;
    } else if (operator === "minus") {
      result = firstNumber - secondNumber;
    } else if (operator === "times") {
      result = firstNumber * secondNumber;
    } else if (operator === "divide") {
      // Ensure no division by zero
      if (secondNumber != 0) {
        result = firstNumber / secondNumber;
      } else {
        result = "Undefined!";
      }
    } else if (operator === "power") {
      result = Math.pow(firstNumber, secondNumber);
    }
    // Display result text on calculator's display
    resultText.innerHTML = result;
    // Set result to zero if currently equal to undefined
    if (result === "Undefined!") {
      result = parseInt(0);
    }
  });

  // This function executes when user clicks on the clear button
  clear.addEventListener("click", function() {
    resetCalculator();
  });
}
