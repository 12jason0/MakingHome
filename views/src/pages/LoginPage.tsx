import React from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
  // 뒤로가기 버튼 
  const navigate = useNavigate();
  // 뒤로가기 버튼 끝
  // 로그인 form 양식
  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm()
  const onValid = ():void =>{}
  const onInValid = ():void =>{}
  // 로그인 form 양식 끝
    return (
    <div style={{width:'500px',display:'absolute',margin: '0 auto'}}>
      <header style={{display:'flex', justifyContent:'space-between'}}>
        <img src="./image/back.png" alt="뒤로가기" style={{width:'30px',cursor:'pointer'}} onClick={()=>{navigate(-1)}}/>
        <img src="./image/home.png" alt="홈으로 이동" style={{width:'30px',cursor:'pointer'}} onClick={()=>{navigate('/')}}/>
      </header>
      <body>
        <h4>로그인 페이지</h4>
        <button>카카오 1초 로그인/회원가입</button>
        <hr />
        <form onSubmit={handleSubmit(onValid,onInValid)}>
          <input type="text" placeholder ="아이디"id="userId"/><br />
          <input type="password"placeholder ="비밀번호" id="userPw"/><br />
          <button>로그인</button>
        </form>
      </body>
    </div>
  )
}
