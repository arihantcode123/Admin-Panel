import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const AuthProvider = ({children})=>{

    const [token,setToken]=useState(localStorage.getItem("token"));
    const [services,setServices]=useState("")
    const [user,setUser]=useState("");
    const [isLoading,setIsLoading]=useState(true)
    const authorizationToken=`Bearer ${token}`;

    const storetokenInLS=(serverToken)=>{
        setToken(serverToken)
        return localStorage.setItem("token",serverToken)
    }

    // console.log("isloggedin",isLoggedIn);
    
    //logout function
    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem("token");
    }
    
    let isLoggedIn=!!token;
    //jwt authentication - to get currently loggedin user data

    const userAuthentication=async()=>{
        try {
            setIsLoading(true)
            const response=await fetch('http://localhost:5000/api/auth/user',{
                method:"GET",
                headers:{
                    Authorization:authorizationToken
                }
            })
            // console.log(response);
            if(response.ok){
                const data=await response.json();
                // console.log(data);
                setUser(data.userData);
                setIsLoading(false)
            }else{
                console.log("Error fetching user data");
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getServiceData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/data/service", {
            method: "GET"
          });
          if (response.ok) {
              const services = await response.json();
              setServices(services);
              console.log("service", services);
            }
        } catch (error) {
          console.log(error);
        }
      };
      

    useEffect(()=>{
        getServiceData();
        userAuthentication();
    },[])

    return <AuthContext.Provider value={{isLoggedIn,storetokenInLS,LogoutUser,user,services,authorizationToken,isLoading}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the provider")
    }
    return authContextValue; 
}