import {createContext,useReducer,useContext,useEffect} from "react";
import reducer from "../reducer/cartReducer";
import axios from "axios";
const CartContext = createContext();


const getLocalCartData = () =>{
    let localcartdata = localStorage.getItem("mycart");
    if(localcartdata === "undefined")
    {
        return [];
    } else 
    {
        return JSON.parse(localcartdata);
    }
}
const initialState = {
      cart: getLocalCartData(),
      total_item: "",
      total_price: "",
      shipping_fee: 50000,
};
const CartProvider = ({children}) => {
    

    const [state,dispatch] = useReducer(reducer,initialState);
    const addToCart = (id,color,amount,product) =>{
          dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}});
    };
    const removeItem = (id) =>{
        dispatch({type:"REMOVE_ITEM",payload:id});
    };
    const clearCart = () =>{
        dispatch({type:"CLEAR_CART"});
    };
    const setIncrement = (id) =>{
        dispatch({type:"SET_INCREMENT",payload:id});
    }
    const setDecrement = (id) =>{
        dispatch({type: "SET_DECREMENT",payload:id});
    }
    const updateCartInDB = async (updatedCart) => {
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          console.log("Token from updateCart:", token);
          if (!token) return;
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/update-cart`,
            { cart: updatedCart },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          console.error("Error syncing cart to DB", err);
        }
      };
    useEffect(() =>{
        dispatch({type:"CART_TOTAL_ITEM"});
        dispatch({type:"CART_TOTAL_PRICE"});
        dispatch({type:"CART_ITEM_PRICE_TOTAL"});
        localStorage.setItem("mycart", JSON.stringify(state.cart));
        updateCartInDB(state.cart);
    },[state.cart]);


    return <CartContext.Provider value={{...state,addToCart,removeItem,clearCart,setIncrement,setDecrement}}>{children}</CartContext.Provider>
};


const useCartContext = () =>{
    return useContext(CartContext);
};

export {CartProvider,useCartContext};