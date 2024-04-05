import React from 'react';

const buttonClasses = "key bg-gray-200 rounded-md p-4 text-xl font-semibold hover:bg-gray-300 focus:outline-none"

type KeyPadProps = {
  handleClick: (value: string) => void;
}

const KeyPad = ({ handleClick }: KeyPadProps) => {

  return (
    <div className="keypad grid grid-cols-3 gap-2 p-4 max-w-xs mx-auto">
      <button className={buttonClasses} onClick={() => handleClick('1')}>1</button>
      <button className={buttonClasses} onClick={() => handleClick('2')}>2</button>
      <button className={buttonClasses} onClick={() => handleClick('3')}>3</button>
      <button className={buttonClasses} onClick={() => handleClick('4')}>4</button>
      <button className={buttonClasses} onClick={() => handleClick('5')}>5</button>
      <button className={buttonClasses} onClick={() => handleClick('6')}>6</button>
      <button className={buttonClasses} onClick={() => handleClick('7')}>7</button>
      <button className={buttonClasses} onClick={() => handleClick('8')}>8</button>
      <button className={buttonClasses} onClick={() => handleClick('9')}>9</button>
      <button className={buttonClasses} onClick={() => handleClick('⌫')}>⌫</button>
      <button className={buttonClasses} onClick={() => handleClick('0')}>0</button>
      <button className={buttonClasses} onClick={() => handleClick('↩️')}>↩️</button>
    </div>

  )
}

export default KeyPad;
