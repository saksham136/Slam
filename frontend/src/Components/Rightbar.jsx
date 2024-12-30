import "./rightbar.css";
import {Users} from "../dummyData"
import Online from "../Components/Online"
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {Add} from "@mui/icons-material"

export default function Rightbar({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFreinds]=useState([]);
  const {user:currentUser} = useContext(AuthContext);

  console.log("saksham" ,user)

  useEffect(()=>{
    const getFriends=async()=>{
      try{
        const friendList=await axios.get("/users/friends/"+user._id);
        setFreinds(friendList.data);
      }catch(err){
        console.log(err);
      }
    };
  
    getFriends();

  }, [user])



  const HomeRightbar=()=>{
    return(
    <>
        <div className="birthdayContainer">
        <img src="assets/gift.png" alt="" className="birthdayImg" />
        <span className="birthdaytext">
          <b>Pola Foster</b>and <b>3 other friends</b> have a birthday today 
        </span>
      </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <div className="rightbarTitle"><b>Online Freinds</b></div>
        <ul className="rightbarFriendList">
          {Users.map((u)=> (<Online key={u.id} frnd={u}/>))}
        </ul>
  
    </>
    )
  }
  

    const ProfileRightbar= () => { 

     
      return (
        <>
           {user.username!==currentUser.username && (
            <button className="rightbarFollowButton"> 
            Follow<Add/>
            </button>
           )}


      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">

      <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarValue">{user.city}</span>
        </div>


        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarValue">{user.from}</span>
        </div>

        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarValue">{user.relationship===1?"Single":user.relationship===2?"Married":"-"}</span>
        </div>
      </div>

      <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
      { friends.map((friend)=>(
        <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
        <div className="rightbarFollowing">
        <img crossorigin="anonymous" 
        src={friend.profilePicture? PF+friend.profilePicture: PF+"person/noavatar.png"} 
        alt="" 
        className="rightbarFollowingImg"/>
        <span className="rightbarFollowingName">{friend.username}</span>
      </div> 
      </Link>

      )) }
          

         
        </div>

      
      </>
      );


      
    }

  return (
    <div className="rightbar">
     <div className="rightbarWrapper">
         { user ?<ProfileRightbar/> :<HomeRightbar/>}
      </div>
    </div>
   
  )
}
