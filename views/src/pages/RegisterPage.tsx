import React,{useState,useRef}from 'react'
import {useForm} from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { error } from 'console';

type FormValues = {
  name : string;
  age : number;
  email: string;
  phone : string;
  userId: string;
  userPw: string; 
}

interface user {
    name? : string,
    age? : number | boolean,
    email?: string,
    phone?: string,
    userId? : string,
    userPw? : string,
}
export default function RegisterPage() {
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const userIdRef = useRef<HTMLInputElement>(null);
    const userPwRef = useRef<HTMLInputElement>(null);
    // 실험 1
    const [user,setUser] = useState<user>();
    // 로그인 hook-form
    const {
      register,
      handleSubmit,
      formState:{errors},
      setFocus
    } = useForm<FormValues>();
    const onValid = ():void =>{
      alert('회원가입 성공');
        console.log('회원가입 성공',user);
    }
    const onInValid = ():void =>{
        if(errors?.name){
            alert(errors.name?.message);
            setFocus('name');
        }
        else if(errors?.age){
             alert(errors.age?.message);
             setFocus('age');
        }
        else if(errors?.email){
             alert(errors.email?.message);
             setFocus('email');
        }
        else if(errors?.phone){
             alert(errors.phone?.message);
             setFocus('phone');
        }
        else if(errors?.userId){
             alert(errors.userId?.message);
             setFocus('userId');
        }
        else if(errors?.userPw){
             alert(errors.userPw?.message);
             setFocus('userPw');
        }
    }
  return (
    <div style={{position:'relative',width:'500px',margin: '0 auto'}}>
      <header style={{display:'flex', justifyContent:'space-between'}}>
        <img src="./image/back.png" alt="뒤로가기" style={{width:'30px',cursor:'pointer'}} onClick={()=>{navigate(-1)}}/>
        <img src="./image/home.png" alt="홈으로 이동" style={{width:'30px',cursor:'pointer'}} onClick={()=>{navigate('/')}}/>
      </header>
      <body>
        <form onSubmit={handleSubmit(onValid,onInValid)}>
          <div style={{position:'absolute',left:'35%'}}>
            <input type="text"
            {...register('name',
            { required: '나이는 필수 항목입니다.',
              validate: {
                trimValid: (name : string) =>{
                    if(name?.trim() ==='')
                    return '이름은 필수 항목입니다....';
                    // 이름 유효성 패턴 정규식 받아오기
                }
             }})}
            onChange={(e)=>{setUser({...user,name:e.target.value})}} placeholder="이름"/><br />
            {errors.name && <div style={{fontSize:'12px',color:'red'}}>이름을 입력하십시오</div>}  

          <input type="text" 
           {...register('age', {
            required: '나이는 필수 항목입니다.',
            validate: {
                useAge : (age) =>{
                  console.log(age)
                }
            },
            })} 
            onChange={(e)=>{console.log(e.target.value);
            setUser({...user,age: e.target.value.trim() !== '' && Number(e.target.value) })}} placeholder="나이"/><br />
             {errors.age && <div style={{fontSize:'12px',color:'red'}}>나이를 입력하십시오</div>}  

            <input type="email" value = {user?.email}
            {...register('email', {
              required: false,
              validate: {
                trimValid: (email : string) => {
                  if(email?.trim() ==='')
                  return '이름은 필수 항목입니다....';
                  }
              },
              })} 
             onChange={(e)=>{setUser({...user,email:e.target.value})}}placeholder="이메일"/><br />
            
            <input type="text" value={user?.phone}
            {...register('phone', {
              required: false,
              validate: {
                trimValid: (phone : string) => {
                  if(phone?.trim() ==='')
                  return '이름은 필수 항목입니다....';
                  }
              }
              })} 
             onChange={(e)=>{setUser({...user,phone:e.target.value})}} placeholder='전화번호'/><br />
            
            <input type="text" value={user?.userId}
            {...register('userId', {
              required: '아이디는 필수 항목입니다.',
              validate: {
                trimValid: (userId : string) => {
                  if(userId?.trim() ==='')
                  return '이름은 필수 항목입니다....';
                  }
              }
              })} 
             onChange={(e)=>{setUser({...user,userId:e.target.value})}}placeholder ="아이디"/><br />
            <input type="password" value={user?.userPw}
            {...register('userPw', {
              required: '비밀번호는 필수 항목입니다.',
              validate: {
                  trimValid: (userPw : string) => {
                    if(userPw?.trim() ==='')
                    return '이름은 필수 항목입니다....';
                  }
              }
              })} 
            onChange={(e)=>{setUser({...user,userPw: e.target.value})}} placeholder ="비밀번호"/><br />
            <button>회원가입</button>
          </div>
        </form>     
      </body>
    </div>
  )
}
