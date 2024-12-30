import "./topFriends.css"

export default function TopFriends({tpfrnd}) {
  return (
    <li className="sidebarFriend">
     <img className="sidebarFriendImg" src={tpfrnd.profilePicture} alt="" />
     <span className="sidebarFriendName">{tpfrnd.username}</span>
     </li>
  )
}


    
