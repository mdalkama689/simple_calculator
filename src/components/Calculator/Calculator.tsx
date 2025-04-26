import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import { operations, formatNumber, parseDisplayValue } from '../../utils/calculator';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [inputExpression, setInputExpression] = useState('');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [pendingOperator, setPendingOperator] = useState<string | null>(null);
  const [activeOperator, setActiveOperator] = useState<string | null>(null);

  const clearAll = () => {
    setDisplay('0');
    setInputExpression('');
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setPendingOperator(null);
    setActiveOperator(null);
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
      setActiveOperator(null);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (operator: string) => {
    const inputValue = parseDisplayValue(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setInputExpression(`${formatNumber(inputValue)}  ${operator}  `);
    } else if (pendingOperator && !waitingForSecondOperand) {
      const result = performCalculation();
      setDisplay(formatNumber(result));
      setFirstOperand(result);
      setInputExpression(`${formatNumber(result)}  ${operator}  `);
    }

    setWaitingForSecondOperand(true);
    setPendingOperator(operator);
    setActiveOperator(operator);
  };

  const performCalculation = (): number => {
    const inputValue = parseDisplayValue(display);

    if (pendingOperator === '+') {
      return operations.add(firstOperand as number, inputValue);
    }
    if (pendingOperator === '-') {
      return operations.subtract(firstOperand as number, inputValue);
    }
    if (pendingOperator === '×') {
      return operations.multiply(firstOperand as number, inputValue);
    }
    if (pendingOperator === '÷') {
      return operations.divide(firstOperand as number, inputValue);
    }

    return inputValue;
  };

  const handleEquals = () => {
    if (!pendingOperator || firstOperand === null) return;

    const inputValue = parseDisplayValue(display);
    const result = performCalculation();
    
    setInputExpression(`${formatNumber(firstOperand)}  ${pendingOperator}  ${formatNumber(inputValue)}  =`);
    setDisplay(formatNumber(result));
    setFirstOperand(result);
    setWaitingForSecondOperand(true);
    setPendingOperator(null);
    setActiveOperator(null);
  };

  const handlePercentage = () => {
    const inputValue = parseDisplayValue(display);
    const result = operations.percentage(inputValue);
    setDisplay(formatNumber(result));
    setInputExpression(`${formatNumber(inputValue)}%  =`);
  };

  const handleToggleSign = () => {
    const inputValue = parseDisplayValue(display);
    const result = operations.negate(inputValue);
    setDisplay(formatNumber(result));
  };

  return (
    <div className="flex flex-col bg-[#1E1E1E] rounded-3xl overflow-hidden shadow-2xl max-w-[300px] sm:max-w-[340px] mx-auto w-full border border-[#2A2A2A]">
      <Display input={inputExpression} output={display} />
      
      <div className="grid grid-cols-4 gap-2.5 p-4 bg-[#1E1E1E]">
        <Button 
          label="AC" 
          onClick={clearAll} 
          type="function" 
        />
        <Button 
          label="+/-" 
          onClick={handleToggleSign} 
          type="function" 
        />
        <Button 
          label="%" 
          onClick={handlePercentage} 
          type="function" 
        />
        <Button 
          label="÷" 
          onClick={() => handleOperator('÷')} 
          type="operator"
          isActive={activeOperator === '÷'}
        />
        
        <Button 
          label="7" 
          onClick={() => inputDigit('7')} 
          type="number" 
        />
        <Button 
          label="8" 
          onClick={() => inputDigit('8')} 
          type="number" 
        />
        <Button 
          label="9" 
          onClick={() => inputDigit('9')} 
          type="number" 
        />
        <Button 
          label="×" 
          onClick={() => handleOperator('×')} 
          type="operator"
          isActive={activeOperator === '×'}
        />
        
        <Button 
          label="4" 
          onClick={() => inputDigit('4')} 
          type="number" 
        />
        <Button 
          label="5" 
          onClick={() => inputDigit('5')} 
          type="number" 
        />
        <Button 
          label="6" 
          onClick={() => inputDigit('6')} 
          type="number" 
        />
        <Button 
          label="-" 
          onClick={() => handleOperator('-')} 
          type="operator"
          isActive={activeOperator === '-'}
        />
        
        <Button 
          label="1" 
          onClick={() => inputDigit('1')} 
          type="number" 
        />
        <Button 
          label="2" 
          onClick={() => inputDigit('2')} 
          type="number" 
        />
        <Button 
          label="3" 
          onClick={() => inputDigit('3')} 
          type="number" 
        />
        <Button 
          label="+" 
          onClick={() => handleOperator('+')} 
          type="operator"
          isActive={activeOperator === '+'}
        />
        
        <Button 
          label="0" 
          onClick={() => inputDigit('0')} 
          type="number"
          isWide 
        />
        <Button 
          label="." 
          onClick={inputDecimal} 
          type="number" 
        />
        <Button 
          label="=" 
          onClick={handleEquals} 
          type="operator" 
        />
      </div>
    </div>
  );
};

export default Calculator;