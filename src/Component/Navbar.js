import React, { useEffect, useContext, useRef } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import './login.css'
import { Link, useHistory } from 'react-router-dom'
import { usercontext } from '../App'
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import M from 'materialize-css'
import { Avatar } from '@mui/material';
const NavBar = () => {
  const history = new useHistory();
  const { state, dispatch } = useContext(usercontext)

  const slide = useRef(null);
  const [state1, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });



  useEffect(() => {

    M.Sidenav.init(slide.current)
  }, [])



  const list = (anchor) => (
    <Box bgcolor="#2196F3" color="white"
      sx={{ width: anchor === 'bottom' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

        <ListItem button >
          <ListItemIcon><HomeIcon style={{ color: "white" }}> </HomeIcon></ListItemIcon>
          <Link to="/" style={{ color: "white", display: "block" }}>  Home</Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon> <PersonIcon style={{ color: "white" }}></PersonIcon> </ListItemIcon>
          <Link to="/profile" style={{ color: "white" }}>  Profile</Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon> <FollowTheSignsIcon style={{ color: "white" }}></FollowTheSignsIcon>  </ListItemIcon>
          <Link to="/myfollowerpost" style={{ color: "white" }}> Follower</Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon><AddCircleOutlineIcon style={{ color: "white" }}></AddCircleOutlineIcon>       </ListItemIcon>
          <Link to="/Createpost" style={{ color: "white" }}>CreateFeed</Link>
        </ListItem>


      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><ExitToAppIcon style={{ color: 'white' }}></ExitToAppIcon> </ListItemIcon>
          <button className="btn waves-effect waves-light  #004d40 red darken-1"
            style={{ width: "120px" }}
            onClick={() => {
              localStorage.clear()
              // in dispatch passing the function which returns the object which we passed here
              dispatch({ type: "CLEAR" })
              history.push('/login')
            }}>
            Logout
          </button>
        </ListItem>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box >
  );
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state1, [anchor]: open });
  };

  const rednering = () => {
    if (state) {

      return [

        <MenuIcon onClick={toggleDrawer("bottom", true)} style={{ cursor: "pointer", marginRight: "30px" }} />

      ]
    }
    else {
      return (
        <>
          <div>
            <Button>  <Link style={{ color: "white" }} to="/login">Login</Link></Button>
            <Button>  <Link style={{ color: "white" }} to="/signup">SignUp</Link></Button>
          </div>
        </>
      )
    }
  }



  // useEffect(()=>{

  //   const M=window.M;

  //   document.addEventListener('DOMContentLoaded', function() {
  //     var elems = document.querySelectorAll('.sidenav');
  //     var instances = M.Sidenav.init(elems, {});
  //   });

  // },[])



  return (
    <>
      <div className="navbar blue">
        <div clasName="navbar-left">
          <a href="#" data-target="slide-out" class="sidenav-trigger">
            <a class="brand-logo"><Avatar></Avatar> </a> </a>

        </div>
        <div className="navbar-right">
          {rednering()}
        </div>
      </div>




      <ul id="slide-out" class="sidenav #0288d1 light-blue darken-2" ref={slide}>
        <li><div class="user-view">
          <div class="background">
          </div>

          <br></br>
          <a href="#user" ><img class="circle" src={state ? state.photo : ""}
            style={{
              height: "150px", width: "150px", boxShadow: "5px 5px 10px white",
              marginLeft: "30px"
            }}
          /></a>
          <a href="#name" ><h6 class="black-text name"
            style={{ fontSize: "15px", textTransform: "capitalize" }}
          >{state ? state.name : ""}</h6></a>
          <a href="#email"><h6 class="black-text email "
            style={{ fontSize: "15px" }}>{state ? state.email : ""}</h6></a>
          <li><Link to="/security" style={{ fontSize: "15px" }}>
            <hr></hr>
            <i class="material-icons">security</i>
            Security
          </Link></li>
          <li><Link to="/contactus" style={{ fontSize: "15px" }}>
            <hr></hr>
            <i class="material-icons">contacts</i>
            Contact us
          </Link></li>
          <marquee> for security reason you can only refresh the homepage</marquee>
          <a href="https://secretechat.herokuapp.com/" style={{ color: "white" }}>Try  RealTime Chat app!</a>
          <h5 style={{ marginLeft: "23px", marginTop: "40px", fontWeight: "800px", color: "white" }}>LEECHI ©️  2020</h5>

        </div></li>
      </ul>



      <Drawer
        anchor={"bottom"}
        open={state1["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        {list("bottom")}
      </Drawer>






    </>
  )
}
export default NavBar;