// import React,{useState} from "react"
// import Axios from "axios"
// import {Link,useNavigate} from "react-router-dom"
// const Signup = () =>{
//     const [username,setUsername] = useState("")
//     const [email,setEmail] = useState("")
//     const [password,setPassword] = useState("")
    

//     const navigate = useNavigate()
//     const handleSubmit = async (e) =>{
//         try{
//          e.preventDefault()
//         const URL = "http://localhost:5000/"+"api/auth/signup"
//         const response = await Axios.post(URL,{
//             username,
//             email,
//             password,
//         })
//         console.log(response)
//         navigate('/login')
//         }catch(err) {
//             console.log(err)
//         }
//     };
//     return (
//         <div>
//             <h2>Sign Up</h2>
//             <form onSubmit={handleSubmit}>
//               <label htmlFor="username">Username</label>
//               <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>

//               <label htmlFor="email">Email</label>
//               <input type="email" autocomplete="off" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

//               <label htmlFor="password">Password</label>
//               <input type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
//               <button type="submit" onSubmit={handleSubmit}>Sign Up</button>
//               <p>Have an Account? <Link to="/login">Login</Link></p>
//             </form>
//         </div>
//     )
// }

// export default Signup


import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`;
      const response = await Axios.post(URL, {
        username,
        email,
        password,
      });
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <div className="signup-container">
        <h2>Create Account</h2>
        <p>Sign up to explore our services</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>

          <div className="extra-links">
            <p>
              Already have an account? <Link to="/login">Login</Link>
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

  .signup-container {
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
          background: ${({ theme }) => theme.colors.btnHover || "#483db3"};
        }
      }

      .extra-links {
        font-size: 0.9rem;

        p {
          color: ${({ theme }) => theme.colors.text};
        }

        a {
          color: ${({ theme }) => theme.colors.helper};
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Signup;
