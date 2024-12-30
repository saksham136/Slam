
import "./Home.css"
import Topbar from "../../Components/Topbar.jsx"
import Rightbar from "../../Components/Rightbar.jsx"
import Sidebar from "../../Components/Sidebar.jsx"
import Feed from "../../Components/feed.jsx"

const Home = () => {
  return (
    <>
 <Topbar/>
 <div className="homeContainer">
 <Sidebar/>
 <Feed/>
 <Rightbar/>
 </div>
 
 </>
  )
}

export default Home
