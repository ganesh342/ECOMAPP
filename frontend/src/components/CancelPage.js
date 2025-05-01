import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
const CancelPage = () => {
  return (
    <Wrapper>
      <div className="container">
        <h1>Payment Cancelled</h1>
        <p>It looks like you cancelled the payment. Feel free to try again anytime.</p>
        <Link to="/cart"><Button>Return to Cart</Button></Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f9f9f9;
  padding: 5rem 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    text-align: center;
    background-color: white;
    padding: 3rem 4rem;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 60%;
    max-width: 600px;

    h1 {
      color: #ff4d4d;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    p {
      color: #333;
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
  }
`;

const Button = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border-radius: 2rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #e04c4c;
  }
`;

export default CancelPage;
