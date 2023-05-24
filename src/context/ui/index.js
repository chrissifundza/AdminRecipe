import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
export const UIContext = createContext({});
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [CurrentUserEmail, setCurrentUserEmail] = useState('')
  const [LoggedID, setLoggedID] = useState(0)
  const [CurrentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [Photo, setPhoto] = useState("https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg")
   const navigate=useNavigate()
      //Reset password
      const login = async (inputs)=>{
        const res = await Axios.post("https://recipeapp154.herokuapp.com/api/auth/adminlogin", inputs)
        setCurrentUser(res.data)
        navigate("/dashboard")
       console.log(res.data)

    }
    useEffect(()=>{
      localStorage.setItem("user", JSON.stringify(CurrentUser))
      },[CurrentUser])

      const logout = async (inputs)=>{
        const res = await Axios.post("https://recipeapp154.herokuapp.com/api/auth/adminlogout",CurrentUser)
        
        setCurrentUser(null)
        navigate("/")
        
    }
        useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged((user) => {

            if(user){
              console.log("User logged in")
             
              
            }else{
              console.log("User logged out")
             
            }
            
            console.log(user.email)
            setCurrentUserEmail(user.email)
            getUse(user.email)
           
          });
      
          return unsubscribe;
        }, []);
       
          
        async function getUse(user){
         let response= await Axios.get("http://localhost:3001/admin/"+user)
            console.log(response.data)
            setLoggedID(response.data[0].idadmin)
            setPhoto(response.data[0].UserPhoto)
         return response.data
         }
        
        
          
    const value = {
      CurrentUserEmail,
      LoggedID,
      login,
      logout,
      Photo, setPhoto
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}