import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoDark from "./images/TS_Dark.png"
import logoLight from "./images/TS_light.png"
function Signup(){
    const navigate = useNavigate();
    const URL=process.env.REACT_APP_API_URL


    function onChangeBirthday(){
        document.getElementById("labelBirthday").innerHTML="Birthday"
        document.getElementById("labelBirthday").style.color="black"
    }
    function onChangePassword(){
        document.getElementById("labelRegisterPassword").innerHTML="Confirm Password"
        document.getElementById("labelRegisterPassword").style.color="black"
    }
    async function submit(e){
        e.preventDefault();

        
        var Bdate = document.getElementById('birthday').value;
        var Bday = +new Date(Bdate);
        let age=(~~((Date.now() - Bday) / (31557600000)))
        if(age>=16){
            
            if(document.getElementById('password').value!==document.getElementById('confirmPassword').value){
               document.getElementById("labelRegisterPassword").innerHTML="Password does not match."
               document.getElementById("labelRegisterPassword").style.color="red"
            }else{
                
                
                try {
                    
                        axios({
                            method: "POST",
                            data: {
                                firstName:document.getElementById('firstName').value,
                                lastName:document.getElementById('lastName').value,
                                email:document.getElementById('email').value,
                                password:document.getElementById('password').value,
                                birthDay:document.getElementById('birthday').value,
                            },
                            withCredentials: true,
                            url: URL+"register",
                        }).then((res) => {
                            if(res.status===201){
                                navigate(`/`);
                            }else{
                                alert("User already exist")
                            }   
                        });
    
                } catch (error) {
                    console.log(error)
                }
            }
        }else{
            document.getElementById("labelBirthday").innerHTML="You must be at least 16 to register."
            document.getElementById("labelBirthday").style.color="red"
        }

        
       
        
          
        
        
    }

    return(
        <section className="h-100 gradient-form container-fluid" style={{backgroundColor: "#eee"}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6" style={{backgroundColor:"#F1F6F9"}}>
                                <div className="card-body p-md-5 mx-md-4">

                                    

                                    <form onSubmit={submit} >
                                    <h5>Sign-up for a new account.</h5>
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
                                        <input type="email" id="email" className="form-control" name="email"
                                        placeholder="Phone number or email address" required/>
                                        <label className="form-label" htmlFor="email" maxLength={30}>Email address</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="password" required id="password" maxLength={30} minLength={8} className="form-control" name="password" placeholder="Password" />
                                        <label className="form-label" htmlFor="password" >Password</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input maxLength={30} required type="password" id="confirmPassword" className="form-control" onChange={onChangePassword} name="confirmPassword" placeholder=" Confirm Password" />
                                        <label className="form-label" htmlFor="confirmPassword" id="labelRegisterPassword">Confirm Password</label>

                                      
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="date" required id="birthday" className="form-control" name="birthday" onChange={onChangeBirthday} placeholder="Birthday" />
                                        <label className="form-label" htmlFor="birthday" id="labelBirthday">Birthday</label>
                                    </div>
                                    <div className="text-center pt-1 pb-1 d-grid">
                                        <button className="btn btn-block fa-lg gradient-custom-2 mb-3" id="postButton" type="submit">Sign-up</button>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">Already have account?</p>
                                        <a href="/" type="button" className="btn" id="postButton">Log-in</a>   
                                    </div>
                
                                    </form>

                                </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center text-center pb-5" style={{backgroundColor:"#14274E"}}>
                                
                                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                <div className="text-center">
                                    <img src={logoDark}
                                        style={{width: 185}} alt="logo"/>
                                    </div>
                                    <h4 className="mb-4">Think & Share</h4>
                                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
    )
} 

export default Signup