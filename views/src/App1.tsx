import React from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  // useEffect callback 함수는 Promise를 지원하지 않는다.
  useEffect(() => {
    const resFunc = async () => {
      // const res = await axios.get('http://localhost:5000/api');
      // console.log(res.data.message);
    };
    resFunc();

    // fetch('http://localhost:5000/api')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     return console.log(data);
    //   })
    //   .catch((error) => console.error('Error fetching data:', error)); // 추가: 에러 처리
  }, []);
  return <div className="App">Test</div>;
}

export default App;
