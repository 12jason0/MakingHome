import React, { useEffect,useState } from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';


export default function LoginPage() {
  let code : string | null;
  // 페이지 이동 navigate + params 추출
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect : 카카오 로그인 클릭 - url 업데이트 - stoarge <-> code 저장
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    code = searchParams.get('code');
    if (code !== null) {
      // localStorage.setItem('setCode', code);
      setIsLoggedIn(true);
      sendKakaoLoginCode(code);
    }
  }, [location.search]);
  const sendKakaoLoginCode = async(code : string): Promise<void> => {
    const res = await axios.post('http://localhost:5000/login/kakao',{code : code}); 
    const access_token = res.data.access_token;
    console.log('access_token',access_token);
    localStorage.setItem('Token',access_token);
    await sendKakaoUserInfo(access_token);
  }
  const sendKakaoUserInfo = async(access_token : string | null): Promise<void> =>{
    const userInfo = await axios.post('http://localhost:5000/user/kakao',{access_token : access_token});
    console.log('userInfo',userInfo.data); 
  }
    // 카카오 로그인 양식(Rest_API 키 + redirect_Uri + kakaoURL)
    const Rest_api_key='34596871e6b97db995c419d12fd24a01';
    const redirect_uri = 'http://localhost:3000/login';
    const kakaoURL =`https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const KakaoLogin = async () => {
      window.location.href = kakaoURL;
    }
    // 카카오 로그아웃
    const KakaoLogout = () => {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate('/login');
    }
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

    // HTML
    return (
    <div style={{width:'500px',margin: '0 auto'}}>
      <header style={{display:'flex', justifyContent:'space-between'}}>
        <img src="./image/back.png" alt="뒤로가기" style={{width:'30px',cursor:'pointer'}} onClick={()=>{navigate(-1)}}/>
        <img src="./image/home.png" alt="홈으로 이동" style={{width:'30px',cursor:'pointer'}} onClick={()=>{navigate('/')}}/>
      </header>
      <body>
        <div style={{display:'flex', justifyContent:'center'}}>
          <h3>{isLoggedIn ? '환영합니다' : '로그인 페이지'}</h3>
        </div>
        {isLoggedIn 
        ? <img src="./image/logout.png" alt="카카오 로그아웃 이미지" style={{display:'block', margin:'0 auto'}} onClick={KakaoLogout}></img>
        : <img src="./image/kakao_login.png" alt="카카오 로그인 이미지" style={{display:'block', margin:'0 auto'}} onClick={KakaoLogin}></img>} 
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

  // 로그인 토큰값 존재할 시 강제 페이지 이동
  // if(localStorage.getItem('setToken')){
  //   document.location.href='/';
  // }