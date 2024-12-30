import "./Topbar.css"
import {Search , Person ,Chat ,Notifications }  from "@mui/icons-material"
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext"
import { useContext } from "react";

const Topbar = () => {


    const {user} = useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user);

  const handleLogout = () => {

    localStorage.removeItem("user");  // Optionally, remove any session or auth token stored in localStorage
    // Optionally, redirect to login page or home
    window.location.href = "/login";
  };




  return (
   <div className="topbarContainer">
    <div className="topbarLeft">
        <Link to = "/" style={{textDecoration:"none"}}>
        <span className="logo">SlamBook</span>
        </Link>
        
    </div>
    <div className="topbarCenter">
        <div className="searchbar"> 
            <Search className="searchIcon"/>
            <input  placeholder="Search for friend, post or public" className="searchInput"/>
        </div>
    </div>
    <div className="topbarRight">
        <div className="topbarLinks">
           <div className="topbarLink">Homepage</div>
           <div className="topbarLink">TimeLine</div>
           <button className="topbarLink" onClick={handleLogout}>Logout</button>
        </div>
        <div className="topbarIcons">
            <div className="topbarIconItem">
                <Person/>
                <span className="topbarIconbadge">1</span>
            </div>
            <div className="topbarIconItem">
                <Chat/>
                <span className="topbarIconbadge">2</span>
            </div>
            <div className="topbarIconItem">
                <Notifications/>
                <span className="topbarIconbadge">1</span>
            </div>
            
        </div>
        <Link to={`/profile/${user.username}`}>
        <img crossorigin="anonymous"  src={user.profilePicture ? PF + user.profilePicture: PF+"person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
    </div>
   </div>
  )
}

export default Topbar
