import "./sidebar.css"
import {RssFeed ,School, Event, WorkOutline,HelpOutline,Bookmark, Group, PlayCircleFilledOutlined } from "@mui/icons-material"
import {Users} from "../dummyData"
import TopFriends from "../Components/TopFriends"
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
          <ul className="sidebarList">
           

            <li className="sidebarListItem">
             <PlayCircleFilledOutlined   className="sidebarIcon"/>
              <span className="sidebarListItemText">Videos</span>
            </li>

            <li className="sidebarListItem">
             <Group  className="sidebarIcon"/>
              <span className="sidebarListItemText">Groups</span>
            </li>

            <li className="sidebarListItem">
             <Bookmark  className="sidebarIcon"/>
              <span className="sidebarListItemText">BookMarks</span>
            </li>

            <li className="sidebarListItem">
             <HelpOutline  className="sidebarIcon"/>
              <span className="sidebarListItemText">Questions</span>
            </li>

            <li className="sidebarListItem">
             <WorkOutline  className="sidebarIcon"/>
              <span className="sidebarListItemText">Jobs</span>
            </li>

            <li className="sidebarListItem">
             <Event  className="sidebarIcon"/>
              <span className="sidebarListItemText">Events</span>
            </li>

            <li className="sidebarListItem">
             <School  className="sidebarIcon"/>
              <span className="sidebarListItemText">Courses</span>
            </li>
            </ul>
         
         <button className="sidebarButton">Show More</button>
         <hr className="sidebarHr"/>
         <ul className="sidebarFriendList">
         
         {Users.map((u)=>(
          <TopFriends key={u.id} tpfrnd={u}/>

          ))}
         

         </ul>

      </div>
    </div>
  )
}
