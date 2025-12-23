import * as math from "mathjs";
import Button from "./components/button";
import { useState } from "react";
import Screen from "./components/screen";
import "./styles/app.css"

function Calculator() {

  // State for the current input display
  const [input, setInput] = useState("0");
  // State to track if a bracket is opened
  const [openBracket, setOpenBracket] = useState(false);
  // State for screen theme: "On" for active calculator, "Off" for power-off mode
  const [theme, setTheme] = useState("On");

  // Array of button labels for the calculator layout
  const buttons = [
    "⏻", "C", "⌫", "±",
    "7", "8", "9", "()", "%",
    "4", "5", "6", "x", "/",
    "1", "2", "3", "+", "-",
    "0", "00", ".", "="
  ];

  /**
   * Resets the calculator state to initial values (e.g. when turned off)
   */
  const reset = () => {
    setInput('0');
    setOpenBracket(false);
  }

  /**
   * Handles button clicks and updates the input state accordingly.
   * @param label - The label of the button clicked (e.g., "1", "+", "=")
   */
  const handleButton = (label: string) => {
    if (label === '⏻') { reset(); setTheme(prev => (prev === "On" ? "Off" : "On")); }
    if (theme === 'On' && label !== '⏻') {
      setInput(prev => {
        if (prev === 'Error' || prev === 'Infinity') return label; // Reset display on error/infinity
        if (label === '=') return handleCalculations(prev);
        if (label === 'C') { reset(); return '0'; }
        if (label === '⌫') return handleDeletion(prev);
        if (label === '±') return prev === '0' ? '0' : handleSignToggle(prev); // No sign toggle for zero
        if (label === '.') return handleDots(prev, label);
        if (label === '()') return prev === '0' ? handleBracket() : prev + handleBracket(); // Start with '(' if empty
        if (prev === '0') return label === '00' ? '0' : label; // Replace '0' with input, but '00' stays '0'
        return handleExpressions(prev, label);
      });
    }
  };

  /**
   * Evaluates the mathematical expressions using mathjs.
   * @param expression - The string expression to evaluate (e.g., "2+3")
   * @returns The result as a string, or 'Error' if invalid
   */
  const handleCalculations = (expression: string) => {
    try {
      const sanitized = expression.replace(/x/g, '*'); // Replace 'x' with '*' for mathjs
      const result = math.evaluate(sanitized);
      return result.toString();
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }

  /**
   * Handles backspace deletion, updating bracket state if needed.
   * @param prev - The current input string
   * @returns The string with last character removed
   */
  const handleDeletion = (prev: string) => {
    if (prev.endsWith('(') || prev.endsWith(')')) {
      setOpenBracket(!openBracket); // Toggle bracket state when deleting brackets
    }
    return prev.length <= 1 ? '0' : prev.slice(0, -1); // Prevent empty string, go back to '0'
  }

  /**
   * Toggles between opening and closing brackets.
   * @returns '(' if no open bracket, ')' if one is open
   */
  const handleBracket = () => {
    if (!openBracket) {
      setOpenBracket(true);
      return '(';
    }
    else {
      setOpenBracket(false);
      return ')';
    }
  }

  /**
   * Tokenizes a string into numbers, operators, and brackets.
   * @param str - The input string to tokenize
   * @returns Array of tokens or null if no matches
   */
  const tokenization = (str: string) => {
    return str.match(/(\d+\.?\d*|[+\-x/()])/g);
  }

  /**
   * Toggles the sign of the last number in the expression.
   * @param prev - The current input string
   * @returns The updated string with sign toggled
   */
  const handleSignToggle = (prev: string) => {
    const tokens = tokenization(prev);
    if (!tokens) return prev;
    const lastIndex = tokens.length - 1;
    if (/[+\-x/()]/.test(tokens[lastIndex])) {
      if (
        tokens[lastIndex] === ')' &&
        tokens[lastIndex - 2] === '(' &&
        tokens[lastIndex - 3] === '-') { // Check if last is "-(number)"
        tokens.splice(lastIndex - 3, 4, tokens[lastIndex - 1]); // Remove the "-(number)" and keep just the number
      }
    } else {
      tokens[lastIndex] = `-(${tokens[lastIndex]})`; // Wrap the last number in negative brackets
    }
    return tokens.join('');
  }

  /**
   * Handles adding decimal points to numbers.
   * @param prev - The current input string
   * @param label - The dot label '.'
   * @returns The updated string with dot added if valid
   */
  const handleDots = (prev: string, label: string) => {
    const tokens = tokenization(prev);
    if (!tokens) return prev;
    const lastIndex = tokens?.length - 1;
    const lastInput = Number(tokens[lastIndex]);
    if (Number.isInteger(lastInput)) { // If last token is a whole number
      return tokens[lastIndex].includes('.') ? prev : prev + label; // Add dot only if not already present
    }
    return prev; // Don't add dot if last token is not a number or already has decimal
  }

  /**
   * Handles general expression input, replacing operators if needed.
   * @param prev - The current input string
   * @param label - The button label clicked
   * @returns The updated string
   */
  const handleExpressions = (prev: string, label: string) => {
    const tokens = tokenization(prev);
    if (!tokens) return prev;
    const lastIndex = tokens.length - 1;
    const lastToken = tokens[lastIndex];
    const isOperator = (s: string) => /[+\-x/%]/.test(s);

    if (isOperator(label) && isOperator(lastToken)) { // If both current and new input are operators
      tokens[lastIndex] = label; // Replace the last operator with the new one
      return tokens.join('');
    }
    return prev + label; // Otherwise, just append the new input
  }

  return (
    <div className="root">
      <div className="calculator">
        <h2 className="calculator-header">Calculator</h2>
        <div className="container">
          <div className="calculator-body">
            <Screen value={input} theme={theme}></Screen>
            {buttons.map((button, index) => (
              <Button
                key={index}
                btnClass={`button${index}`}
                onAction={handleButton}
                label={button}>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
