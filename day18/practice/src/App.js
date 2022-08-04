import './App.css';
import './reset.css';
import { useState } from 'react';

const text = <span>안녕하세요</span>;
const inner = `안녕하세요`;
const name = `hello`;


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>H1 메인 타이틀입니다.</h1>
      <p className={name}>이곳은 p태그 영역입니다. {inner}</p>
      {text}
      {text}
      {text}
      {text}
      <p className='hi'>{count}</p>
      <button onClick={()=>{
        setCount(count + 1);
      }}>증가</button>
    </div>
  );
}

export default App;
