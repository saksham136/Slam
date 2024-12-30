import "./online.css"

export default function Online({frnd}) {
  return (
    <li className="rightbarFreind">
            <div className="rightbarprofileImgContainer">
               <img src={frnd.profilePicture} alt="" className="rightbarProfileImg" />
            <span className="rightbarOnline"></span>
               </div>
               <span className="rightbarUserName">{frnd.username}</span>
          </li>
  )
}
