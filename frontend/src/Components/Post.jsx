import "./post.css"
import {MoreVert} from "@mui/icons-material"
import { useState ,useEffect, useContext} from "react";
import axios from "axios";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"



export default function Post({post}) {
    
    const[like, setlike]= useState(post.likes.length);
    const[isLiked, setIsLiked]= useState(false);
    const[User,setUser]=useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);


    useEffect(()=>{
        const fetchusers= async ()=>{
          const res= await axios.get(`/users/${post.userId}`);
          setUser(res.data);
        }
        fetchusers();
       
      },[post.userId])

    const likeHandler=()=>{
        try{
            axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
        } catch(err){

        }

        setlike(isLiked ? like-1: like+1);
        setIsLiked(!isLiked);
    };

     return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to = {`profile/${User.username}`}>
                    <img   crossorigin="anonymous" className="postProfileImg" src={User.profilePicture ? PF+User.profilePicture : PF+"person/noavatar.png"} alt="" />
                    </Link>
                    <span className="postUsername">{User.username}</span>
                    <span className="postDate">{format(post.created_At)}</span>
                </div>
                <div className="postTopRight">
               <MoreVert />
                </div>
           </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img  crossorigin="anonymous" className="postImg " src={PF+post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img crossorigin="anonymous" className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                    <img crossorigin="anonymous" className="likeIcon" src={`${PF}heart.png`}  onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} People Like it</span>
                    
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} Comments</span>
                </div>
            </div>
        </div>
    </div>
    
  )
}
