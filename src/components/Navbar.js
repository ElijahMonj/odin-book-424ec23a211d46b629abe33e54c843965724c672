import React from "react";
import {Link, NavLink} from 'react-router-dom'
import 'bootstrap/js/dist/dropdown';
import { useState,useEffect } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logoDark from "./images/TS_Dark.svg"
import logoLight from "./images/TS_light.svg"

import { useNavigate } from 'react-router-dom';

function NavigationBar() {
    
    const navigate = useNavigate();
    const URL=process.env.REACT_APP_API_URL
    const [user, setUser]=useState(0)
    useEffect(()=>{
        const fetchData = async () => {
            try {
                await axios({
                    method: "GET",
                    withCredentials: true,
                    url: URL,
                  }).then((res) => {
                    setUser(res.data);
                    console.log(res.data);
                  });
            } catch (error) {
                console.log(error)
                setUser(1)
            }
                
        };
        
        console.log("Fetching data...")
        fetchData();
        
    },[]);
    async function refresh(){
      const fetchData = () => {
          try {
              axios({
                  method: "GET",
                  withCredentials: true,
                  url: URL,
                }).then((res) => {
                  setUser(res.data);
                  console.log(res.data);
                });
          } catch (error) {
              console.log(error)
              setUser(1)
          }
              
      };
      
      console.log("Fetching data...")
      fetchData();
  }
    function userAccountName(){
        return user.currentUser.firstName+" "+user.currentUser.lastName
    }
    function logOut(){ 
      
        try {
            axios({
                method: "POST",
                withCredentials: true,
                url: URL+"logout",
              }).then((res) => {
                console.log(res)
                
                //navigate('/')
                window.location.reload(true)
              });
        } catch (error) {
            console.log(error)
            setUser(1)
        }
        setUser(1) 
                 
    }
    function search(e){
      e.preventDefault();
      let urlTest=document.getElementById('searchparams').value
      
      navigate(`/search/?filter=${urlTest}`);
      
    }
    function checkNotifications(){  
      if (user.currentUser.notifications.length===0){
        return (<div className="text-muted text-center">No notifications yet.</div>)
      }
    }
    function checkIfClicked(){
      const element = document.getElementById('offcanvasNavbarDropdown-expand-md').classList
      if(element.contains('show')){
        alert("turn on")
      }else{
        alert("turn off")
      }
    } 
    function isLoggedIn(){
            if ((user === 0)||(user === 1)) {
              return(
                <div>LOADING....</div>
              )
            } if(user.username!=="Please Login"){
            return (  
                <>
                  {['md'].map((expand) => (
                    <Navbar key={expand} bg="" expand={expand} >

                      <Container fluid>
                        <Navbar.Brand className="p-0"><Link to="/" ><img

                                    src={logoLight}
                                    height="40"
                                    
                                    alt="TS Logo"
                                    loading="lazy"
                                /></Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                          id={`offcanvasNavbar-expand-${expand}`}
                          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                          placement="end"
                        >
                        
                          <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                              Offcanvas
                            </Offcanvas.Title>
                          </Offcanvas.Header>
                          
                          <Offcanvas.Body>
                          <Form className="d-flex" onSubmit={search}>
                            <div className="input-group">
                              <Form.Control
                                type="search"
                                placeholder="Search user"
                                className=""
                                aria-label="Search"
                                id="searchparams"
                              />

                              <Button variant="" id="searchBtn" type="submit">
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                              </svg></Button>
                              </div>
                            </Form>
                            
                            <Nav className="justify-content-end flex-grow-1 pe-3" style={{gap:1}}>
                              
                              <NavDropdown 
                              align="end"
                              className="align-items-center notifIcon"
                              
                              title={
                                <div className="notif pull-left ">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                  </svg>
                                </div>
                              } 
                                id={`offcanvasNavbarDropdown-expand-${expand}`}

                                >
                                
                                <h4 className="ms-3 text-break" style={{width:229}}>Notifications</h4>
                                <NavDropdown.Divider />
                                {checkNotifications()}
                                {user.currentUser.notifications.map(function(notif, idc){
                                  function findName(){
                                        var uu = user.users.find(item => item._id === notif.user_id);
                                        return uu.firstName+" "+uu.lastName
                                  }
                                  function findProfilePic(){
                                        var pp = user.users.find(item => item._id === notif.user_id);
                                        return pp.defaultProfile
                                    }
                                  return (
                                <NavDropdown.Item href="" key={idc} className="">
                                <div className="d-flex flex-start my-2 text-break text-wrap">
                                        <img className="rounded-circle shadow-1-strong me-3"
                                            src={findProfilePic()} alt="avatar" width="50"
                                            height="50" />
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div>
                                            <div className="d-flex flex-column">
                                                <p className="m-0 text-break text-wrap" >
                                                <span className="text-break text-wrap" style={{fontWeight:"bold"}}> {findName()}   </span>
                                                <span className="text-break text-wrap"> {notif.content} </span>
                                                </p>
                                                
                                            </div>
                                            <p className="mb-0 text-muted">
                                            {notif.date}
                                            </p>
                                            </div>
                                        </div>
                                  </div>  
                                  
                                  
                                </NavDropdown.Item>
                                  )
                              })}
                                

                              </NavDropdown>


                              
                              <NavDropdown 
                              align="end"
                              title={
                                  <div className="pull-left">
                                      <img className="thumbnail-image rounded-circle" 
                                          src={user.currentUser.defaultProfile} 
                                          alt="user pic"
                                          style={{height:40,width:40,objectFit:"cover"}}
                                      />
                                  </div>
                              } 
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                              >
                                <NavDropdown.Item  as={Link} to={'/myprofile'}>
                                
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-lines-fill mb-1 me-2" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"></path>
                                  </svg>
                                  View Profile
            
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/settings'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-lines-fill mb-1 me-2" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                      </svg>
                                  Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/about'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-lines-fill mb-1 me-2" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                                  About
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logOut}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-lines-fill mb-1 me-2" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                                Log-Out
                                  
                                </NavDropdown.Item>
                              </NavDropdown>
                            </Nav>
                            
                          </Offcanvas.Body>
                        </Navbar.Offcanvas>
                      </Container>
                    </Navbar>
                  ))}
                </>
              );
        }
    }
  return (  
    <div>{isLoggedIn()}</div>
  );
}

export default NavigationBar;