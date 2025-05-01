// import React,{useState} from "react"
// import {Link,useNavigate} from "react-router-dom"
// import axios from "axios"
// const Login = () =>{

//     const [email,setEmail] = useState("")
//     const [password,setPassword] = useState("")
    

//     const navigate = useNavigate()
//     const handleSubmit = async(e) =>{
//         try{
//             e.preventDefault()
//             const res = await axios.post("http://localhost:5000/api/auth/login",{ email, password });
//             console.log(res);
//             localStorage.setItem("token", JSON.stringify(res.data.token));
//             localStorage.setItem("mycart", JSON.stringify(res.data.cart || []));
//             window.location.reload();
//              navigate("/");
//         }catch(err)
//         {
//             console.log("error in login" ,err)
//         }
       
//     };
//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>

//               <label htmlFor="email">Email</label>
//               <input type="email" autocomplete="off" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

//               <label htmlFor="password">Password</label>
//               <input type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
//               <button type="submit" onSubmit={handleSubmit}>Login</button>
//               <Link to="/forgotPassword">Forget Password?</Link>
//               <p>Don't Have Account? <Link to="/signup">Sign Up</Link></p>
//             </form>
//         </div>
//     )
// }

// export default Login


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("mycart", JSON.stringify(res.data.cart || []));
      navigate("/");
      window.location.reload(); // ensures complete re-render
    } catch (err) {
      console.log("error in login", err);
    }
  };

  return (
    <Wrapper>
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <div className="extra-links">
            <Link to="/forgotPassword">Forgot Password?</Link>
            <p>
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};

  .login-container {
    width: 40rem;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: #fff;
    text-align: center;

    h2 {
      margin-bottom: 1rem;
      color: ${({ theme }) => theme.colors.heading};
    }

    p {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.text};
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      label {
        text-align: left;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.text};
      }

      input {
        padding: 0.8rem 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        font-size: 1rem;
      }

      button {
        background: ${({ theme }) => theme.colors.btn};
        color: white;
        padding: 0.9rem 1rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 600;

        &:hover {
          background: ${({ theme }) => theme.colors.btnHover || "#6254f3"};
        }
      }

      .extra-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.9rem;

        a {
          color: ${({ theme }) => theme.colors.helper};
          text-decoration: underline;
        }

        p {
          color: ${({ theme }) => theme.colors.text};
        }
      }
    }
  }
`;

export default Login;

