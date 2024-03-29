import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import axios from 'axios';

type serverData = 'userId' | 'userPw';
type FormValues = {
  userId?: string;
  userPw?: string;
};

export default function LoginPage() {
  let code: string | null;
  // navigate, location, state
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<string>('');

  // 다른 페이지 탐색 후 돌아왔을 때, 사용자 정보 유지
  useEffect(() => {
    if (localStorage.getItem('Token') && Cookie.get('username')) {
      setIsLoggedIn(true);
      const username: string | undefined = Cookie.get('username');
      if (username !== undefined) {
        setUserInfo(username);
      }
    }
  });
  // 페이지 새로고침 시 State값 초기화 방지
  useEffect(() => {
    const username: string | undefined = Cookie.get('username');
    if (username !== undefined) {
      setUserInfo(username);
    }
  }, []);
  // useEffect : 카카오 로그인 클릭 - url 업데이트 - stoarge <-> code 저장
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    code = searchParams.get('code');
    if (code !== null) {
      getKakao_Access_Token(code);
      setIsLoggedIn(true);
    }
  }, [location.search, userInfo]);
  // 카카오 액세스 토큰 발급
  const getKakao_Access_Token = async (code: string): Promise<void> => {
    const res = await axios.post('http://localhost:5000/api/login/kakao', {
      code: code,
    });
    const access_token = res.data.access_token;
    console.log('access_token', access_token);
    localStorage.setItem('Token', access_token);

    await getKakaoUserInfo(access_token);
  };
  // 카카오 로그인 유저 정보 조회
  const getKakaoUserInfo = async (
    access_token: string | null
  ): Promise<void> => {
    const userInfo = await axios.post('http://localhost:5000/user/kakao', {
      access_token: access_token,
    });
    console.log('userInfo', userInfo.data);
    Cookie.set(
      'username',
      userInfo.data.result.kakao_account.profile.nickname,
      { expires: 1 }
    );
    const username: string | undefined = Cookie.get('username');
    if (username !== undefined) {
      setUserInfo(username);
    }
  };
  // 카카오 로그인 양식(Rest_API 키 + redirect_Uri + kakaoURL)
  const Rest_api_key = '34596871e6b97db995c419d12fd24a01';
  const redirect_uri = 'http://localhost:3000/login';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const KakaoLogin = async () => {
    window.location.href = kakaoURL;
  };
  // 카카오 로그아웃
  const KakaoLogout = () => {
    localStorage.clear();
    Cookie.remove('username');
    setIsLoggedIn(false);
    navigate('/login');
  };
  // 로그인 hook-form
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>();

  // oneroom 로그인 양식
  const onValid = (data: FormValues): void => {
    const result = async () => {
      const res = await axios.post('http://localhost:5000/api/login', {
        userInput: {
          userId: data.userId,
          password: data.userPw,
        },
      });
      const { success, message, token } = res.data;
      console.log('resdata', res.data);
      const item: serverData = res.data.item;
      if (success) {
        alert(`${message}`);
        setIsLoggedIn(true);
        localStorage.setItem('oneroomToken', token);
        console.log('oneroomToken', localStorage.getItem('oneroomToken'));
        // navigate('/');
      } else {
        alert(`${message}`);
        setFocus(`${item}`);
      }
    };
    result();
  };
  const onInValid = (): void => {
    if (errors?.userId) {
      alert(errors.userId?.message);
      setFocus('userId');
    } else if (errors?.userPw) {
      alert(errors.userPw?.message);
      setFocus('userPw');
    }
  };

  // HTML
  return (
    <div style={{ width: '500px', margin: '0 auto' }}>
      <body>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h3>{isLoggedIn ? `${userInfo}님 환영합니다` : '로그인 페이지'}</h3>
        </div>
        {isLoggedIn ? (
          <img
            src="./image/logout.png"
            alt="카카오 로그아웃 이미지"
            style={{ display: 'block', margin: '0 auto' }}
            onClick={KakaoLogout}
          ></img>
        ) : (
          <img
            src="./image/kakao_login.png"
            alt="카카오 로그인 이미지"
            style={{ display: 'block', margin: '0 auto' }}
            onClick={KakaoLogin}
          ></img>
        )}
        <hr />
        <form onSubmit={handleSubmit(onValid, onInValid)}>
          <input
            type="text"
            {...register('userId', {
              required: '아이디를 입력하세요',
            })}
            placeholder="아이디"
            id="userId"
          />
          <br />
          <input
            type="password"
            {...register('userPw', {
              required: '비밀번호를 입력하세요',
            })}
            placeholder="비밀번호"
            id="userPw"
          />
          <br />
          <button>로그인</button>
          <button>
            <Link to="/register">회원가입</Link>
          </button>
        </form>
      </body>
    </div>
  );
}

// 로그인 토큰값 존재할 시 강제 페이지 이동
// if(localStorage.getItem('setToken')){
//   document.location.href='/';
// }
