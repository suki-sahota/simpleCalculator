  //window.onload = function() {
  document.addEventListener("DOMContentLoaded", function(){
  //$(document).ready(function() {
    console.log("DOM Fully Loaded and Parsed");

    //create variables for calculator
    let firstNumber = "";
    let secondNumber = "";
    let operator = "";
    let result = 0;
    let isOperatorSelected = false;
    let isCalculated = false;

    //create variables for document text elements to avoid parsing HTML document repeatedly
    let firstNumberText = document.getElementById("#first-number");
    //$("#first-number");
    let operatorText = document.getElementById("#operator");
    //$("#operator");
    let secondNumberText = document.getElementById("#second-number");
    //$("#second-number");
    let resultText = document.getElementById("#result");
    //$("#result");
    //$(".card-body h1");
    let numbers = document.getElementsByClassName("number");
    let operators = document.getElementsByClassName("operator");
    let equal = document.getElementsByClassName("equal");
    let clear = document.getElementsByClassName("clear");

    //function to reset calculator values to neutral state
    function resetCalculator() {
      //clear "calculator memory"
      firstNumber = "";
      secondNumber = "";
      operator = "";
      result = 0;
      isOperatorSelected = false;
      isCalculated = false;

      //clear calculator's display
      
      /*
      while (firstNumberText.hasChildNodes()) firstNumberText.removeChild(firstNumberText.childNodes[0]);
      while (operatorText.firstChild) operatorText.removeChild(operatorText.firstChild);
      while (secondNumberText.firstChild) secondNumberText.removeChild(secondNumberText.firstChild);
      while (resultText.firstChild) resultText.removeChild(resultText.firstChild);
      */
      if (firstNumberText != null) {
        firstNumberText.innerHTML("");
      }
      if (operatorText != null) {
        operatorText.innerHTML("");
      }
      if (secondNumberText != null) {
        secondNumberText.innerHTML("");
      }
      if (resultText != null) {
        resultText.innerHTML("");
      }
      //displayText.empty();
    }

    resetCalculator();

    //this function executes when user clicks on a number
    for (i = 0; i < numbers.length; i++) {
      numbers[i].addEventListener("click", pressNumber());
    }
    function pressNumber() {
    //document.getElementsByClassName("number").addEventListener("click", function() {
    //$(".number").on("click", function() {
      console.log(this.id);
      //reset calculator to neutral state
      if (isCalculated) {
        resetCalculator();
      }

      //if isOperatorSelected is true, capture user selection as part of secondNumber
      if (isOperatorSelected) {
        //add string version of selected number to secondNumber variable
        secondNumber += document.getElementById(this).value;
        //secondNumber += $(this).val();
        //show updated secondNumber on calculator's display
        secondNumberText.innerHTML(secondNumber);
        //secondNumberText.text(secondNumber);
      } 
      //if isOperatorSelected is false, capture user selection as part of firstNumber
      else {
        //add string version of selected number to firstNumber variable
        firstNumber += document.getElementById(this).value;
        console.log(firstNumber);
        //firstNumber += document.getElementById(this).value;
        //firstNumber += $(this).val();
        //show updated firstNumber on calculator's display
        firstNumberText.innerHTML(firstNumber);
        //firstNumberText.text(firstNumber);
      }
    };
    //});

    for (i = 0; i < operators.length; i++) {
      operators[i].addEventListener("click", pressOperator);
    }
    //this function executes when user clicks on an operator symbol
    function pressOperator() {
    //document.getElementById(".operator").addEventListener("click", function() {
    //$(".operator").on("click", function() {
      //do not allow user to select operator if firstNumber is empty
      if (firstNumber === "") {
        return;
      }

      //operator symbol after equal sign -> use result as firstNumber and clear rest
      if (isCalculated) {
        firstNumber = result;
        firstNumberText.innerHTML(firstNumber);
        //firstNumberText.text(firstNumber);
        secondNumber = "";
        secondNumberText.empty();
        resultText.empty();
        isCalculated = false;
      }

      //operator symbol after secondNumber, but before equal sign -> conduct prev operation, use result as firstNumber, and clear rest (except isOperatorSelected)
      if (secondNumber != "") {
        pressEqual();
        firstNumber = result;
        firstNumberText.innerHTML(firstNumber);
        //firstNumberText.text(firstNumber);
        secondNumber = "";
        secondNumberText.empty();
        resultText.empty();
        isCalculated = false;
      }

      //update isOperatorSelected to true so we know firstNumber is complete
      isOperatorSelected = true;
      //set operator variale to string version of selected operator
      operator = document.getElementById(this).value;
      //operator = $(this).val();
      //show the operator symbol selected on calculator's display
      operatorText.innerHTML(document.getElementById(this).innerHTML);   //************check this one please */
      //operatorText.text($(this).text());
    }
    //});

    for (i = 0; i < equal.length; i++) {
      equal[i].addEventListener("click", pressEqual);
    }
    //this function executes when user clicks on the equal sign
    function pressEqual() {
    //document.getElementById(".equal").addEventListener("click", function() {
    //$(".equal").on("click", function() {
      //do not allow user to select equal sign if firstNumber is empty
      if (firstNumber === "") {
        return;
      }

      //set result to firstNumber if equal pressed before operator
      if (!isOperatorSelected) {
        result = firstNumber;
        resultText.innerHTML(result);
        //resultText.text(result);
        isCalculated = true;
        return;
      }

      //use firstNumber as both numbers if secondNumber empty
      if(secondNumber === ""){
        secondNumber = firstNumber;
        secondNumberText.innerHTML(secondNumber);
        //secondNumberText.text(secondNumber);
      }

      //equal pressed twice in a row
      if (isCalculated) {
        firstNumber = result;
        firstNumberText.innerHTML(firstNumber);
        //firstNumberText.text(firstNumber);
      }

      //update isCalculated to keep track if a calculation has occurred
      isCalculated = true;
      //type cast our numbers to actual integers
      firstNumber = parseInt(firstNumber);
      secondNumber = parseInt(secondNumber);
      //determine which operation to use on our two numbers
      if (operator === "plus") {
        result = firstNumber + secondNumber;
      } else if (operator === "minus") {
        result = firstNumber - secondNumber;
      } else if (operator === "times") {
        result = firstNumber * secondNumber;
      } else if (operator === "divide") {
        //ensure no division by zero
        if (secondNumber != 0) {
          result = firstNumber / secondNumber;
        } else {
          result = "Undefined!";
        }
      } else if (operator === "power") {
        result = Math.pow(firstNumber, secondNumber);
      }
      //display result text on calculator's display
      resultText.text(result);
      //set result to zero if currently equal to undefined
      if (result === "Undefined!") {
        result = parseInt(0);
      }
    }
    //});

    for (i = 0; i < clear.length; i++) {
      clear[i].addEventListener("click", pressClear);
    }
    //this function executes when user clicks on the clear button
    function pressClear() {
    //document.getElementById(".clear").addEventListener("click", function() {
    //$(".clear").on("click", function() {
      resetCalculator();
    }
    //});
  });
