import "./share.css"
import {PermMedia ,Label,Room,EmojiEmotions} from "@mui/icons-material"
import {AuthContext} from "../context/AuthContext"
import { useContext, useRef, useState } from "react";
import axios from "axios";


export default function Share() {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user}=useContext(AuthContext);
    const desc = useRef();
    const [file,setFile]=useState(null);

    const submitHandler=async(e)=>{
      e.preventDefault();

      const newPost={
         userId:user._id.toString(),
         desc:desc.current.value
      }
      if(file){
         const data=new FormData();
         const fileName=Date.now()+file.name;
         data.append("name",fileName);
         data.append("file" , file);
         newPost.img=fileName;

         try{
            await axios.post("/upload",data );
         }catch(err){
            console.log(err);
         }

         
      }

      try{
         await axios.post("/posts",newPost);
          window.location.reload();   // to refresh the page after adding a new post 
      }catch(err){
         console.log(err)

      }
      
    }

    



  return (
    <div className="share">
     <div className="shareWrapper">
        <div className="shareTop">
            <img  crossorigin="anonymous" className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" />
            <input placeholder={"What's in your mind "+ user.username +"?"} 
            className="shareInput"
            ref={desc}/>
        </div>
     <hr className="shareHr"/>
     <form className="shareBottom" onSubmit={submitHandler}>
           <div className="shareOptions">
            
            <label htmFor="file" className="shareOption">
               <PermMedia htmlColor="tomato" ClassName="shareIcon"/>
                <span id="one" className="shareOptionText">Photo or Video</span>
                <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0]) }/>
            </label>

            <div className="shareOption">
             <Label  htmlColor="blue" ClassName="shareIcon"/>
             <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
            <Room  htmlColor="green" ClassName="shareIcon"/>
            <span className="shareOptionText">Location</span>
           </div>

            <div className="shareOption">
            <EmojiEmotions htmlColor="goldenrod" ClassName="shareIcon"/>
            <span className="shareOptionText">Feelings</span>
         
            </div>
         </div>
      <button className="shareButton" type="Submit">Share</button>


     </form>

       
     </div>
    </div>
  )
}
