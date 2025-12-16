//import { useState } from 'react'
import Button from "./components/button";
import { useState } from "react";
import Screen from "./components/screen";
import "./styles/app.css"

function Calculator() {

  const [input, setInput] = useState("0");

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
            <Screen value={input}></Screen>
            {buttons.map((button, index) => (
              <Button btnClass={`button${index}`} setInput={setInput}>{button}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
