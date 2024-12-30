import "./profile.css"
import Topbar from "../../Components/Topbar.jsx"
import Rightbar from "../../Components/Rightbar.jsx"
import Sidebar from "../../Components/Sidebar.jsx"
import Feed from "../../Components/feed.jsx"
import { useEffect, useState } from "react"
import axios from "axios"
import {useParams} from "react-router"




export default function Profile() {
  const[User,setUser]=useState({})
  const username=useParams().username;
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
    const fetchusers= async ()=>{
      const res= await axios.get(`/users?username=${username}`);
      setUser(res.data);
    }
    fetchusers();
   
  },[User.userId])
  return (
<>

<Topbar/>
  <div className="profile">
  <Sidebar/>
  <div className="profileRight">
    <div className="profileRightTop">

     <div className="profileCover">
    <img crossorigin="anonymous" src={User.coverPicture? PF+User.coverPicture : PF+"person/No_Cover.jpg"} alt="" className="profileCoverImg" />
    <img crossorigin="anonymous" src={User.profilePicture?PF+User.profilePicture:PF+'person/noavatar.png'} alt="" className="profileUserImg" />
    </div>
   
   <div className="profileInfo">
    <h4 className="profileInfoName">{User.username}</h4>
    <span className="profileInfoDesc">{User.desc}</span>
   </div>

    </div>
    <div className="profileRightBottom">
    <Feed username={username} />
    <Rightbar user={User} />
    </div>

  </div>
</div>

 </>
  )
}
