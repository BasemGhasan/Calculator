//import { useState } from 'react'
import Button from "./components/button";
import { useState } from "react";
import Screen from "./components/screen";
import "./styles/app.css"

function Calculator() {

  const [input, setInput] = useState("0");
  const [openBracket, setOpenBracket] = useState(false);

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
    setInput(prev => {
      if (label === 'C') { reset(); return '0'; }
      if (label === '⌫') {
        if (prev.endsWith('(') || prev.endsWith(')')) {
          setOpenBracket(!openBracket);
        }
        return prev.length <= 1 ? '0' : prev.slice(0, -1);
      }
      if (label === '±') return prev === '0' ? '0' : handleSignToggle(prev);
      if (label === '.') return prev.includes('.') ? prev : prev + label;
      if (label === '()') {
        const bracket = handleBracket();
        return prev === '0' ? bracket : prev + bracket;
      }
      if (prev === '0') return label === '00' ? '0' : label;
      return prev + label;
    });
  };

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

  const handleSignToggle = (prev: string) => {
    const tokens = prev.match(/(\d+(\.\d+)?|[+\-x/()])/g);
    if (!tokens) return prev;
    const index = tokens.length - 1;
    if (/[+\-x/()]/.test(tokens[index])) {
      if (
        tokens[index] === ')' &&
        tokens[index - 2] === '(' &&
        tokens[index - 3] === '-') {
          tokens.splice(index - 3, 4, tokens[index - 1]);
      }
      else{
        return prev;
      }
    } else {
      tokens[index] = `-(${tokens[index]})`;
    }
    return tokens.join('');
  }

  return (
    <div className="root">
      <div className="calculator">
        <h2 className="calculator-header">Calculator</h2>
        <div className="container">
          <div className="calculator-body">
            <Screen value={input}></Screen>
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
