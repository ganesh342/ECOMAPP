import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/forgotPassword`, {
      email,
    })
      .then((response) => {
        if (response.data.message === "Password reset link sent to your email") {
          alert("Check your email for the reset password link");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <div className="form-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autocomplete="off"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" onClick={() => handleSubmit}>Send Reset Link</button>
        </form>
        <p>
          Remembered your password? <Link to="/login">Login here</Link>
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};

  .form-container {
    background-color: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;

    h2 {
      text-align: center;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 1.5rem;
    }

    label {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.text};
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      margin: 1rem 0;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 0.5rem;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.text};
      outline: none;

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }

    button {
      width: 100%;
      padding: 1rem;
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      font-size: 1rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryHover};
      }
    }

    p {
      text-align: center;
      font-size: 1rem;
      margin-top: 1rem;

      a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
      }
    }
  }
`;

export default ForgotPassword;

