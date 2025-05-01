import React from "react";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Contact from "./Contact";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";
import {GlobalStyle} from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CallBack from "./CallBack";
import ForgotPassword from "./authentication/ForgotPassword";
import ResetPassword from "./authentication/ResetPassword";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import SuccessPage from "./components/SuccessPage";
import CancelPage from "./components/CancelPage";
const App = () => {

   const theme = {
         colors: {
          heading:"rgb(24,24,29)",
          text: "rgba(29,29,29,.8)",
          white: "#fff",
          black: "#212529",
          helper: "#000000",

          bg: "#F6F8FA",
          footer_bg: "#0a1435",
          btn: "rgb(98 84 243)",
          border: "rgba(98 ,84, 243, 0.5)",
          hr: "#ffffff",
          gradient: 
          "linear-gradient(0deg, rgb(132 144 255) 0%, rgba(98 189 252) 100%)",
          shadow: 
          "rgba(0,0,0,0.02) 0px 1px 3px 0px, rgba(27,31,35,0.15) 0px 0px 0px 1px;",
          shadowSupport: "rgba(0,0,0,0.16) 0px 1px 4px",
         },
         media: {
          mobile: "768px",
          tab: "998px",
         },
   };


  return (
  <ThemeProvider theme={theme}>
  <Router>
    <GlobalStyle/>
    <Header />
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/singleproduct/:id" element={<SingleProduct/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<ErrorPage/>}/>
        <Route path="/callback" element={<CallBack />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
       </Routes>
       <Footer />
  </Router>
  </ThemeProvider>
  );
};

export default App;
