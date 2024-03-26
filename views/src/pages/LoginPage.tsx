import React from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
  // 페이지 이동 navigate 
  const navigate = useNavigate();
  // 로그인 hook-form 
  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm()
  // 로그인 기본 입력 양식에 맞을 시, 로그인 유효성 검증 API 호출 
  // 로그인 기본 입력 양식에 맞지 않을 시, 아이디나 비밀번호창 Focus 맞추기
  const onValid = ():void =>{}
  const onInValid = ():void =>{}
  // 카카오 로그인 양식
  const Rest_api_key='34596871e6b97db995c419d12fd24a01';
  const redirect_uri = 'http://localhost:3000/login';
  const kakaoURL =`https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

  const handleLogin = () => {
    window.location.href = kakaoURL;
  }
    // HTML
    return (
    <div style={{width:'500px',margin: '0 auto'}}>
      <header style={{display:'flex', justifyContent:'space-between'}}>
        <img src="./image/back.png" alt="뒤로가기" style={{width:'30px',cursor:'pointer'}} onClick={()=>{navigate(-1)}}/>
        <img src="./image/home.png" alt="홈으로 이동" style={{width:'30px',cursor:'pointer'}} onClick={()=>{navigate('/')}}/>
      </header>
      <body>
        <div style={{display:'flex', justifyContent:'center'}}>
          <h4>로그인 페이지</h4>
        </div>
        <img src="./image/kakao_login.png" alt="카카오 로그인 이미지" style={{display:'block', margin:'0 auto'}} onClick={handleLogin}/>  
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
