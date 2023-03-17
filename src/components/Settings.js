import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './Navbar'

function Settings(){
    const navigate = useNavigate();
    const URL=process.env.REACT_APP_API_URL
    const [user, setUser]=useState(0)
    useEffect(()=>{
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
    function showSuccess(){
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const alert = (message, type) => {
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
              `<div class="alert alert-${type} alert-dismissible" role="alert" style="margin:0px;">`,
              `   <div>${message}</div>`,
              '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
              '</div>'
            ].join('')
            
            alertPlaceholder.append(wrapper)
          }

    
          
          alert('Settings successfully changed.', 'success')
          setTimeout(myTimer, 3000);

          function myTimer() {
          document.getElementById('liveAlertPlaceholder').innerHTML=""
          }
    }
    async function formChangeName(e){
        e.preventDefault()
        
        if(document.getElementById('changeNamePassword').value===document.getElementById('confirmChangeNamePassword').value){
            
            axios({
                method: "PATCH",
                data:{
                    firstName:document.getElementById('firstName').value,
                    lastName:document.getElementById('lastName').value,
                    password:document.getElementById('changeNamePassword').value
                },
                withCredentials: true,
                url:URL+user.currentUser._id+"/changeName/",
              }).then((res) => {
                  console.log(res)
                  if(res.status===201){
                    refresh()
                    document.getElementById('firstName').value=""
                    document.getElementById('lastName').value=""
                    document.getElementById('changeNamePassword').value=""
                    document.getElementById('confirmChangeNamePassword').value=""
                    document.getElementById('closeChangeNameModal').click();
                    showSuccess()
                    
                  }else if(res.status===202){ 
                    document.getElementById('labelChangeNamePassword').style.color='red'
                    document.getElementById('labelChangeNamePassword').innerHTML="Invalid Password."
                  }
              });
        }else{  
            document.getElementById('labelConfirmChangeNamePassword').style.color='red'
            document.getElementById('labelConfirmChangeNamePassword').innerHTML="Password do not match."
        }       
    }
    function onChangeNameRemoveError(){
        document.getElementById('labelConfirmChangeNamePassword').style.color='black'
        document.getElementById('labelConfirmChangeNamePassword').innerHTML="Confirm Password"

        document.getElementById('labelChangeNamePassword').style.color='black'
        document.getElementById('labelChangeNamePassword').innerHTML="Password"
    }

    async function formChangeEmail(e){
        e.preventDefault()
        
        if(document.getElementById('changeEmailPassword').value===document.getElementById('confirmChangeEmailPassword').value){
            
            axios({
                method: "PATCH",
                data:{
                    email:document.getElementById('email').value,
                    password:document.getElementById('changeEmailPassword').value
                },
                withCredentials: true,
                url:URL+user.currentUser._id+"/changeEmail/",
              }).then((res) => {
                  console.log(res)
                  if(res.status===201){
                    refresh()
                    document.getElementById('email').value=""
                    
                    document.getElementById('changeEmailPassword').value=""
                    document.getElementById('confirmChangeEmailPassword').value=""
                    document.getElementById('closeChangeEmailModal').click();
                    showSuccess()
                    
                  }else if(res.status===202){ 
                      if(res.data.message=='Email already in use.'){
                        document.getElementById('labelEmail').style.color='red'
                        document.getElementById('labelEmail').innerHTML="Email already in use."
                      }else if(res.data.message=='Wrong password.'){
                        document.getElementById('labelChangeEmailPassword').style.color='red'
                        document.getElementById('labelChangeEmailPassword').innerHTML="Invalid Password."
                      }
                    
                  }
              });
        }else{  
            document.getElementById('labelConfirmChangeEmailPassword').style.color='red'
            document.getElementById('labelConfirmChangeEmailPassword').innerHTML="Password do not match."
        }       
    }
    function onChangeEmailRemoveError(){
        document.getElementById('labelConfirmChangeEmailPassword').style.color='black'
        document.getElementById('labelConfirmChangeEmailPassword').innerHTML="Confirm Password"

        document.getElementById('labelChangeEmailPassword').style.color='black'
        document.getElementById('labelChangeEmailPassword').innerHTML="Password"

        document.getElementById('labelEmail').style.color='black'
        document.getElementById('labelEmail').innerHTML="Email"
    }
     
    async function formChangePassword(e){
        e.preventDefault()
        
        if(document.getElementById('password').value===document.getElementById('changePasswordPassword').value){
            
            axios({
                method: "PATCH",
                data:{
                    newPassword:document.getElementById('password').value,
                    password:document.getElementById('confirmChangePasswordPassword').value
                },
                withCredentials: true,
                url:URL+user.currentUser._id+"/changePassword/",
              }).then((res) => {
                  console.log(res)
                  if(res.status===201){
                    refresh()
                    document.getElementById('password').value=""
                    
                    document.getElementById('changePasswordPassword').value=""
                    document.getElementById('confirmChangePasswordPassword').value=""
                    document.getElementById('closeChangePasswordModal').click();
                    showSuccess()
                    
                  }else if(res.status===202){ 
                      if(res.data.message=='Wrong password.'){
                        document.getElementById('labelConfirmChangePasswordPassword').style.color='red'
                        document.getElementById('labelConfirmChangePasswordPassword').innerHTML="Invalid Password."
                      }
                    
                  }
              });
        }else{  
            
            document.getElementById('labelChangePasswordPassword').style.color='red'
            document.getElementById('labelChangePasswordPassword').innerHTML="Password do not match."
        }       
    }
    function onChangePasswordRemoveError(){
        document.getElementById('labelConfirmChangePasswordPassword').style.color='black'
        document.getElementById('labelConfirmChangePasswordPassword').innerHTML="Current Password"

        document.getElementById('labelChangePasswordPassword').style.color='black'
        document.getElementById('labelChangePasswordPassword').innerHTML="Confirm New Password"

        document.getElementById('labelPassword').style.color='black'
        document.getElementById('labelPassword').innerHTML="New Password"
    }

    function isAuthenticated(){
        if(user===0){
            return(
                <div>LOADING....</div>
            )
        }else if((user===1||user.username==="Please Login")){
            navigate('/')
        }else{
            return(
                <div className="container container-lg p-3 col col-lg-7">
                <div className="list-group">
                    <div className="list-group-item text-light" aria-current="true" style={{backgroundColor:"#14274E"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-lines-fill mb-1 me-2" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                      </svg>
                        Settings
                    </div>


                    <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#changeName">
                    <div className="text-break">
                    {user.currentUser.firstName+" "+user.currentUser.lastName}
                    </div>
                    <div className="text-break text-wrap col-1 my-auto d-flex justify-content-end" style={{minWidth:50}}>
                        <small className="text-break mx-1 ">Edit</small>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil-fill mt-1" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </div>      
                    
                    </button>
                    
                    <div className="modal fade" id="changeName" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen-sm-down">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Change Name</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form id="formChangeName" onSubmit={formChangeName} >
                                    
                                    <div className="form-outline mb-4 form-floating">
                                        <input type="text" id="firstName" className="form-control" name="firstName"
                                        placeholder="First Name" required maxLength={20}/>
                                        <label className="form-label" htmlFor="firstName">First Name</label>
                                    </div>
                                    <div className="form-outline mb-4 form-floating">
                                        <input type="text" id="lastName" className="form-control" name="lastName"
                                        placeholder="Last Name" required maxLength={20}/>
                                        <label className="form-label" htmlFor="lastName">Last Name</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="password" required id="changeNamePassword" maxLength={30} className="form-control" onChange={onChangeNameRemoveError} name="changeNamePassword" placeholder="Password" />
                                        <label className="form-label" htmlFor="changeNamePassword" id="labelChangeNamePassword">Password</label>
                                    </div>

                                    <div className="form-outline form-floating">
                                        <input maxLength={30} required type="password" id="confirmChangeNamePassword" className="form-control" onChange={onChangeNameRemoveError} name="confirmChangeNamePassword" placeholder=" Confirm Password" />
                                        <label className="form-label" htmlFor="confirmChangeNamePassword" id="labelConfirmChangeNamePassword">Confirm Password</label>

                                    </div>

                
                                    </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeChangeNameModal">Cancel</button>
                            <button type="submit" className="btn" id="postButton" form="formChangeName">Save Changes</button>
                        </div>
                        </div>
                    </div>
                    </div>


                    <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#changeEmail">
                    <div className="text-break text-wrap col-19">
                    {user.currentUser.email}
                    </div>
                    <div className="text-break text-wrap col-1 my-auto d-flex justify-content-end " style={{minWidth:50}}>
                        <small className="text-break mx-1 ">Edit</small>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil-fill mt-1" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </div>                 
                    </button>
                    <div className="modal fade" id="changeEmail" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-fullscreen-sm-down">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Change Email</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                <form id="formChangeEmail" onSubmit={formChangeEmail} >
                                    
                                    <div className="form-outline mb-4 form-floating">
                                        <input type="email" id="email" className="form-control" name="email"
                                        placeholder="Email" required maxLength={30} onChange={onChangeEmailRemoveError}/>
                                        <label className="form-label" htmlFor="lastName" id="labelEmail">Email</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="password" required id="changeEmailPassword" maxLength={30} className="form-control" onChange={onChangeEmailRemoveError} name="changeEmailPassword" placeholder="Password" />
                                        <label className="form-label" htmlFor="changeEmailPassword" id="labelChangeEmailPassword">Password</label>
                                    </div>

                                    <div className="form-outline form-floating">
                                        <input maxLength={30} required type="password" id="confirmChangeEmailPassword" className="form-control" onChange={onChangeEmailRemoveError} name="confirmChangeEmailPassword" placeholder=" Confirm Password" />
                                        <label className="form-label" htmlFor="confirmChangeEmailPassword" id="labelConfirmChangeEmailPassword">Confirm Password</label>

                                    </div>

                                </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeChangeEmailModal">Cancel</button>
                            <button type="submit" className="btn" id="postButton" form="formChangeEmail">Save Changes</button>
                        </div>
                        </div>
                    </div>
                    </div>

                    <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#changePicture">
                    <div className="text-break">
                    Profile Picture
                    </div>
                    <div className="text-break text-wrap col-1 my-auto d-flex justify-content-end" style={{minWidth:50}}>
                        <small className="text-break mx-1 ">Edit</small>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil-fill mt-1" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </div>      
                    
                    </button>
                    <div className="modal fade" id="changePicture" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-fullscreen-sm-down">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Change Profile Picture</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            On beta
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn" id="postButton">Save Changes</button>
                        </div>
                        </div>
                    </div>
                    </div>


                    

                    <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#changePassword">
                    <div className="text-break">
                    Password
                    </div>
                    <div className="text-break text-wrap col-1 my-auto d-flex justify-content-end" style={{minWidth:50}}>
                        <small className="text-break mx-1 ">Edit</small>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil-fill mt-1" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </div>      
                    
                    </button>
                    <div className="modal fade" id="changePassword" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-fullscreen-sm-down">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Change Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form id="formChangePassword" onSubmit={formChangePassword} >
                                    
                                    <div className="form-outline mb-4 form-floating">
                                        <input type="password" id="password" className="form-control" name="password"
                                        placeholder="Password" required maxLength={30} minLength={8} onChange={onChangePasswordRemoveError}/>
                                        <label className="form-label" htmlFor="password" id="labelPassword">New Password</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="password" required id="changePasswordPassword" maxLength={30} className="form-control" onChange={onChangePasswordRemoveError} name="changePasswordPassword" placeholder="Password" />
                                        <label className="form-label" htmlFor="changePasswordPassword" id="labelChangePasswordPassword">Confirm New Password</label>
                                    </div>

                                    <div className="form-outline form-floating">
                                        <input maxLength={30} required type="password" id="confirmChangePasswordPassword" className="form-control" onChange={onChangePasswordRemoveError} name="confirmChangePasswordPassword" placeholder=" Confirm Password" />
                                        <label className="form-label" htmlFor="confirmChangePasswordPassword" id="labelConfirmChangePasswordPassword">Current Password</label>

                                    </div>

                                </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeChangePasswordModal">Cancel</button>
                            <button type="submit" className="btn" id="postButton" form="formChangePassword">Save Changes</button>
                        </div>
                        </div>
                    </div>
                    </div>



                </div>
            </div>
            )
        }
        
    }

    return(
        <div className="container-fluid p-0 m-0">
            <NavigationBar></NavigationBar>
            {isAuthenticated()}
            
           
            {/*
            change password
            <br></br>
            change name
            <br></br>
            change birthday
            <br></br>
            change profile picture
            */}
        </div>
    )
} 

export default Settings