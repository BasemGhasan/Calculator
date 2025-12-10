//import { useState } from 'react'
import Button from "./components/button";
import Screen from "./components/screen";
import "./styles/app.css"

function Calculator() {
  const buttons = [
    "⏻", "C", "⌫", "±", 
    "7", "8", "9", "()","%",
    "4", "5", "6", "x", "/",
    "1", "2", "3", "+", "-",
    "0", "00", ".", "="
  ];

  return (
    <div className="root">
      <div className="calculator">
        <h2 className="calculator-header">Calculator</h2>
        <div className="container">
          <div className="calculator-body">
            <Screen></Screen>
            {buttons.map((button, index) => (
              <Button btnClass={`button${index}`}> {button} </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
