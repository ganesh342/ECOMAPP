import { useNavigate } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
const Callback = () => {
    const navigate = useNavigate();
    const { isLoading, error } = useAuth0();
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Oops... something went wrong</div>;
    }
  
    return navigate("/callback");
  };
  export default Callback;