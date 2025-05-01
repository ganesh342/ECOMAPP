import {createContext,useContext,useReducer,useEffect} from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer";
const filtercontext =  createContext();




const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value:"lowest",
    filters: {
        text:"",
        category:"all",
        company:"all",
        color:"all",
        price:0,
        minprice: 0,
        maxprice:0,
    },
};


export const FilterContextProvider = ({children}) =>{
    
    const { products, isLoading } = useProductContext(); 
    // console.log(useProductContext());
    console.log("filter",products);
    const [state,dispatch] = useReducer(reducer,initialState);

    const setGridView = () =>{
        return dispatch({type:"SET_GRID_VIEW"});
    };
    
    const setListView = () =>{
        return dispatch({type:"SET_LIST_VIEW"});
    };
    
    const clearFilters = () =>{
        return dispatch({type:"CLEAR_FILTERS"});
    }
    const sorting = (event) =>{
        let uservalue =event.target.value;
        return dispatch({type:"GET_SORT_VALUE",payload: uservalue});
    };
    
    const updateFilterValue = (event) =>{
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({type:"UPDATE_FILTERS_VALUE",payload:{name,value}});
    };
    
    
  useEffect(() => {
    console.log("filter2 useEffect Triggered");
      dispatch({ type: "FILTER_PRODUCTS" });
      dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);


    useEffect(() => {
        console.log("filter1 useEffect Triggered");
          dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
      }, [products]);
    return (<filtercontext.Provider value={{...state,setGridView,setListView,sorting,updateFilterValue,clearFilters }} >
        {children}
    </filtercontext.Provider>
    );

};

export const useFilterContext = () =>{
    return useContext(filtercontext);
}