import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type FormValues = {
  name: string;
  age: number;
  email: string;
  phone: string;
  userId: string;
  userPw: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  // 로그인 hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>();
  const onValid = (data: FormValues): void => {
    console.log('data :', data);

    alert('회원가입 성공');
    const result = async () => {
      const res = await axios.post('http://localhost:5000/api/register', {
        userInfo: {
          name: data.name,
          age: data.age,
          email: data.email,
          phone: data.phone,
          userId: data.userId,
          userPw: data.userPw,
        },
      });
    };
    result();
  };
  const onInValid = (): void => {
    if (errors?.name) {
      alert(errors.name?.message);
      setFocus('name');
    } else if (errors?.age) {
      alert(errors.age?.message);
      setFocus('age');
    } else if (errors?.email) {
      alert(errors.email?.message);
      setFocus('email');
    } else if (errors?.phone) {
      alert(errors.phone?.message);
      setFocus('phone');
    } else if (errors?.userId) {
      alert(errors.userId?.message);
      setFocus('userId');
    } else if (errors?.userPw) {
      alert(errors.userPw?.message);
      setFocus('userPw');
    }
  };

  return (
    <div style={{ position: 'relative', width: '500px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img
          src="./image/back.png"
          alt="뒤로가기"
          style={{ width: '30px', cursor: 'pointer' }}
          onClick={() => {
            navigate(-1);
          }}
        />
        <img
          src="./image/home.png"
          alt="홈으로 이동"
          style={{ width: '30px', cursor: 'pointer' }}
          onClick={() => {
            navigate('/');
          }}
        />
      </header>
      <body>
        <form onSubmit={handleSubmit(onValid, onInValid)}>
          <div style={{ position: 'absolute', left: '35%' }}>
            {/* 이름 */}
            <input
              type="text"
              {...register('name', {
                required: '이름은 필수 항목입니다.',
                validate: {
                  trimValid: (name: string) => {
                    if (name?.trim() === '')
                      return '이름은 필수 항목입니다....';
                    else {
                      return true;
                    }
                    // 이름 유효성 패턴 정규식 받아오기
                  },
                },
              })}
              placeholder="이름"
            />
            <br />
            {errors.name && (
              <div style={{ fontSize: '12px', color: 'red' }}>
                이름을 입력하십시오
              </div>
            )}
            {/* 나이 */}
            <input
              type="text"
              {...register('age', {
                required: '나이는 필수 항목입니다.',
                validate: {
                  ageType: (age: string | number) => {
                    if (Number.isNaN(Number(age)) === false) {
                      return true;
                    } else {
                      return '숫자를 입력하세요...';
                    }
                  },
                },
              })}
              placeholder="나이"
            />
            <br />
            {errors.age && (
              <div style={{ fontSize: '12px', color: 'red' }}>
                {errors.age.message}
              </div>
            )}
            {/* 이메일 */}
            <input
              type="email"
              {...register('email', {
                required: false,
                validate: {
                  trimValid: (email: string) => {
                    if (email?.trim() === '')
                      return '이름은 필수 항목입니다....';
                    else return true;
                  },
                },
              })}
              placeholder="이메일"
            />
            <br />
            {/* 전화번호 */}
            <input
              type="text"
              {...register('phone', {
                required: false,
                validate: {
                  trimValid: (phone: string) => {
                    if (phone?.trim() === '')
                      return '이름은 필수 항목입니다....';
                    else return true;
                  },
                },
              })}
              placeholder="전화번호"
            />
            <br />
            {/* 유저아이디 */}
            <input
              type="text"
              {...register('userId', {
                required: '아이디는 필수 항목입니다.',
                validate: {
                  trimValid: (userId: string) => {
                    if (userId?.trim() === '')
                      return '이름은 필수 항목입니다....';
                    else return true;
                  },
                },
              })}
              placeholder="아이디"
            />
            <br />
            {/* 유저 비밀번호 */}
            <input
              type="password"
              {...register('userPw', {
                required: '비밀번호는 필수 항목입니다.',
                validate: {
                  trimValid: (userPw: string) => {
                    if (userPw?.trim() === '')
                      return '비밀번호는 필수 항목입니다....';
                    else {
                      return true;
                    }
                  },
                },
              })}
              placeholder="비밀번호"
            />
            <br />
            <button>회원가입</button>
          </div>
        </form>
      </body>
    </div>
  );
}
