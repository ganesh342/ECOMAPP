import HeroSection from './components/HeroSection';
import Services from './components/Services';
import Trusted from './components/Trusted';
import FeatureProduct from "./components/FeatureProduct";
import { useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

    useEffect(()=>{
      console.log("Token from localStorage:", token);
      if (token) {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
          console.log("✅ Logged in:", res.data.user);
          // proceed with authenticated flow
        }).catch(err => {
          console.log("❌ Not logged in",err);
          localStorage.removeItem("token");
          // redirect to login
        });
      } else {
        console.log("❌ No token found, redirecting to login.");
        navigate("/login");
      }
    },[]);
  const data = {
    name: "My store",
  };
  return  (
  <>
  <HeroSection myData={data} />
  <FeatureProduct />
  <Services />
  <Trusted />
  </>
  );
};



export default Home;
