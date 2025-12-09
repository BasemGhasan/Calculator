//import { useState } from 'react'
import Button from "./components/button";
import Screen from "./components/screen";
import "./styles/app.css"

function Calculator() {
  return (
    <div className="root">
      <div className="calculator">
        <h2 className="calculator-header">Calculator</h2>
        <div className="container">
          <div className="calculator-body">
            <Screen></Screen>
            <Button>=</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
