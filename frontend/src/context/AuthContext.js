

// import { createContext, useEffect, useReducer } from "react";
// import AuthReducer from "./AuthReducer";

// const INITIAL_STATE = {
//   user:JSON.parse(localStorage.getItem("user")) || null,
//   isFetching: false,
//   error: false,
// };


// export const AuthContext = createContext(INITIAL_STATE);

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


//   useEffect(() => {
//     if (state.user) {
//       localStorage.setItem("user", JSON.stringify(state.user));
//     } else {
//       localStorage.removeItem("user"); // Clear user from localStorage if not logged in
//     }
//   }, [state.user]);
  
//   useEffect(()=>{
//     localStorage.setItem("user", JSON.stringify(state.user))
//   },[state.user])
  
//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         isFetching: state.isFetching,
//         error: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // user:{
    
  //   ( "_id": {
  //       "$oid": "676f7c8dbcac970684f61ad4"
  //     },
  //     "username": "saksham",
  //     "email": "saksham123@gmail.com",
  //     "password": "$2b$10$YqRfAPXo4kekf.1rpsMWSuyZJRasr5zf5ttYcj6AD0eg46d6ES2WS",
  //     "profilePicture": "",
  //     "coverPicture": "",
  //     "followers": [],
  //     "followings": [
  //       "676f7d1ad0d553fbb2ae9b66"
  //     ],
  //     "isAdmin": false,
  //     "desc": "loves poetry",
  //     "createdAt": {
  //       "$date": "2024-12-28T04:20:29.872Z"
  //     },
  //     "updatedAt": {
  //       "$date": "2024-12-28T05:07:38.498Z"
  //     },
  //     "__v": 0,
  //     "from": "jamui")
    
  // },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // useEffect(() => {
  //   if (state.user) {
  //     localStorage.setItem("user", JSON.stringify(state.user));
  //   } else {
  //     localStorage.removeItem("user"); // Remove user from localStorage if null
  //   }
  // }, [state.user]);

  useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
       },[state.user])

  console.log("Current user state:", state.user); // Debug log

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
