import React from 'react';
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
    const result = async () => {
      const res = await axios.post('http://localhost:5000/api/register', {
        userInfo: {
          name: data.name,
          age: data.age,
          email: data.email,
          phone: data.phone,
          userId: data.userId,
          password: data.userPw,
        },
      });
      const { success, message } = res.data;
      if (success) {
        alert(`${message}`);
        navigate('/login ');
      } else alert(`${message}`);
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
      if (errors?.email.type === 'pattern') {
        alert('이메일 형식에 맞춰 입력해주세요');
        return;
      }
      alert(errors.email?.message);
      setFocus('email');
    } else if (errors?.phone) {
      if (errors?.phone.type === 'pattern') {
        alert('올바른 전화번호를 입력해주세요');
        return;
      }
      alert(errors.phone?.message);
      setFocus('phone');
    } else if (errors?.userId) {
      alert(errors.userId?.message);
      setFocus('userId');
    } else if (errors?.userPw) {
      if (errors?.userPw.type === 'pattern') {
        alert('비밀번호를 형식에 맞춰 입력해주세요');
        return;
      }
      alert(errors.userPw?.message);
      setFocus('userPw');
    }
  };

  return (
    <div style={{ position: 'relative', width: '500px', margin: '0 auto' }}>
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
                    if (name?.trim() === '') return '이름을 입력하세요...';
                    else {
                      return true;
                    }
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
                나이를 입력하십시오
              </div>
            )}
            {/* 이메일 */}
            <input
              type="email"
              {...register('email', {
                required: false,
                validate: {
                  trimValid: (email: string) => {
                    if (email?.trim() === '') return '이메일을 입력하세요...';
                    else return true;
                  },
                },
                pattern:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
              })}
              placeholder="이메일"
            />
            {errors.email && (
              <div style={{ fontSize: '12px', color: 'red' }}>
                이메일을 입력하세요
              </div>
            )}
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
                pattern: /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/,
              })}
              placeholder="전화번호"
            />
            {errors.phone && (
              <div style={{ fontSize: '12px', color: 'red' }}>
                전화번호를 입력하십시오
              </div>
            )}
            <br />
            {/* 유저아이디 */}
            <input
              type="text"
              {...register('userId', {
                required: '아이디는 필수 항목입니다.',
                validate: {
                  trimValid: (userId: string) => {
                    if (userId?.trim() === '') return '아이디를 입력하세요...';
                    else return true;
                  },
                },
              })}
              placeholder="아이디"
            />
            {errors.userId && (
              <div style={{ fontSize: '12px', color: 'red' }}>
                아이디를 입력하세요
              </div>
            )}
            <br />
            {/* 유저 비밀번호 */}
            <input
              type="password"
              {...register('userPw', {
                required: '비밀번호는 필수 항목입니다.',
                validate: {
                  trimValid: (userPw: string) => {
                    if (userPw?.trim() === '')
                      return '비밀번호를 입력하세요....';
                    else {
                      return true;
                    }
                  },
                },
                // 비밀번호 유효성 : 8 ~ 10자 영문, 숫자 조합
                pattern: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/,
              })}
              placeholder="비밀번호"
            />
            {errors.userPw?.message && (
              <p style={{ fontSize: '12px', color: 'red' }}>
                비밀번호를 입력하세요
              </p>
            )}
            {errors.userPw?.type === 'pattern' && (
              <p style={{ margin: '0', fontSize: '12px', color: 'red' }}>
                비밀번호를 형식에 맞춰입력해주세요
              </p>
            )}
            <button>회원가입</button>
            <br />
          </div>
        </form>
      </body>
    </div>
  );
}
