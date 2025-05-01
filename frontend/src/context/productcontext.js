import {createContext,useContext,useEffect,useReducer} from "react";
import axios from "axios";
import reducer from "../reducer/ProductReducer";

const AppContext = createContext();

// const API = "https://api.pujakaitem.com/api/products";

const API = `${process.env.REACT_APP_BACKEND_URL}/api/auth/products`;

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},

}


const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);

  const getProducts = async (url) =>{
    console.log("executing loading");
    dispatch({type:"SET_LOADING"});
    // console.log(state);
    console.log("executed loading");
try {
      const res = await axios.get(url);
      const products = await res.data;
      console.log("product",products);
      console.log("executing setapidata");
      dispatch({type:"SET_API_DATA",payload: products});
      console.log("executed setapidata");
} catch (error) {
  console.log("executing error");
  dispatch({type:"API_ERROR"});
}
  };
  
  const getSingleProduct = async (url) =>{
    dispatch({type:"SET_SINGLE_LOADING"});
try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      console.log("single",singleProduct);
      dispatch({type:"SET_SINGLE_PRODUCT",payload: singleProduct});
} catch (error) {
  console.log("error",error);
  dispatch({type:"SET_SINGLE_ERROR"});
}
  };


  useEffect(() =>{
      console.log("Product UseEffect Triggered");
      getProducts(API);
  },[]);
      return (
      <AppContext.Provider value={{...state,getSingleProduct}}>
        {children}
      </AppContext.Provider>
      );
};

//custom hooks

const useProductContext = () =>{
    return useContext(AppContext);
};
export {AppProvider,AppContext,useProductContext};