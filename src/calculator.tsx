import * as math from "mathjs";
import Button from "./components/button";
import { useState } from "react";
import Screen from "./components/screen";
import "./styles/app.css"

function Calculator() {

  const [input, setInput] = useState("0");
  const [openBracket, setOpenBracket] = useState(false);
  const [theme, setTheme] = useState("On");

  const buttons = [
    "⏻", "C", "⌫", "±",
    "7", "8", "9", "()", "%",
    "4", "5", "6", "x", "/",
    "1", "2", "3", "+", "-",
    "0", "00", ".", "="
  ];

  const reset = () => {
    setInput('0');
    setOpenBracket(false);
  }

  const handleButton = (label: string) => {
    if (label === '⏻') { reset(); setTheme(prev => (prev === "On" ? "Off" : "On")); }
    if (theme === 'On' && label !== '⏻') {
      setInput(prev => {
        if (prev === 'Error' || prev === 'Infinity') return label;
        if (label === '=') return handleCalculations(prev);
        if (label === 'C') { reset(); return '0'; }
        if (label === '⌫') return handleDeletion(prev);
        if (label === '±') return prev === '0' ? '0' : handleSignToggle(prev);
        if (label === '.') return handleDots(prev, label);
        if (label === '()') return prev === '0' ? handleBracket() : prev + handleBracket();
        if (prev === '0') return label === '00' ? '0' : label;
        return handleExpressions(prev, label);
      });
    }
  };

  const handleCalculations = (expression: string) => {
    try {
      const sanitized = expression.replace(/x/g, '*');
      const result = math.evaluate(sanitized);
      return result.toString();
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }

  const handleDeletion = (prev: string) => {
    if (prev.endsWith('(') || prev.endsWith(')')) {
      setOpenBracket(!openBracket);
    }
    return prev.length <= 1 ? '0' : prev.slice(0, -1);
  }

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

  const tokenization = (str: string) => {
    return str.match(/(\d+\.?\d*|[+\-x/()])/g);
  }

  const handleSignToggle = (prev: string) => {
    const tokens = tokenization(prev);
    if (!tokens) return prev;
    const lastIndex = tokens.length - 1;
    if (/[+\-x/()]/.test(tokens[lastIndex])) {
      if (
        tokens[lastIndex] === ')' &&
        tokens[lastIndex - 2] === '(' &&
        tokens[lastIndex - 3] === '-') {
        tokens.splice(lastIndex - 3, 4, tokens[lastIndex - 1]);
      }
      else {
        return prev;
      }
    } else {
      tokens[lastIndex] = `-(${tokens[lastIndex]})`;
    }
    return tokens.join('');
  }

  const handleDots = (prev: string, label: string) => {
    const tokens = tokenization(prev);
    if (!tokens) return prev;
    const lastIndex = tokens?.length - 1;
    const lastInput = Number(tokens[lastIndex]);
    if (Number.isInteger(lastInput)) {
      return tokens[lastIndex].includes('.') ? prev : prev + label;
    }
    return prev;
  }

  const handleExpressions = (prev: string, label: string) => {
    const tokens = tokenization(prev);
    if (!tokens) return prev;
    const lastIndex = tokens.length - 1;
    const lastToken = tokens[lastIndex];
    const isOperator = (s: string) => /[+\-x/%]/.test(s);

    if (isOperator(label) && isOperator(lastToken)) {
      tokens[lastIndex] = label;
      return tokens.join('');
    }
    return prev + label;
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
