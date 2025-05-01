import React from "react";
import styled from "styled-components";

const SuccessPage = () => {
  return (
    <Wrapper>
      <div className="container">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        <Button to="/home">Go to Home</Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f0f4f8;
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
      color: #4CAF50;
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
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border-radius: 2rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #45a049;
  }
`;

export default SuccessPage;

