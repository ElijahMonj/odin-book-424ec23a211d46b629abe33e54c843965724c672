import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import NavigationBar from "./Navbar";
import aboutLogo from "./images/about.png"
import missionLogo from "./images/mission.png"
import visionLogo from "./images/vision.png"

import BootstrapLogo from "./images/bootstrap.png"
import ExpressLogo from "./images/express.png"
import ReactLogo from "./images/react.png"
import MongoDBLogo from "./images/mongodb.png"
import PassportLogo from "./images/passport.png"
import NodeLogo from "./images/node.png"
function About(){
  const URL=process.env.REACT_APP_API_URL
    function showAbout(){
      return(
        <section className="text-center mx-auto pt-4">
            <h1>Think & Share (h1)</h1>

            <h4>Think about something... and share it with us!(h4)</h4>

            <hr className="my-4"/>

            <h3>What is Think & share?</h3>

            <hr className="my-4"/>

            
            <div className="d-flex flex-column" >
              

              <div className="row d-flex justify-content-center m-0">
                  <div className="col-lg-4 col-md-12">
                    <h5>About</h5>

                    <p className="small text-muted text-uppercase mb-0">Component subheading</p>
                    <p className="small text-muted mb-2">
                      
                    </p>

                    <h6>Component alternative subheading (h6)</h6>

                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. A nemo commodi odio veniam
                      nisi? Cupiditate nobis doloremque unde in ut, consequatur reprehenderit saepe iure
                      perspiciatis, veniam facilis asperiores deleniti at?
                    </p>

                  </div>
                  <div className="col-lg-4 col-md-12 mb-4 d-flex justify-content-center">
                    
                  <img src={aboutLogo}
                    alt="" className="img-fluid m-auto"
                    style={{objectFit:"cover", height:190,zIndex: 1}}/>

                  </div>
              </div>
             
              <hr className="my-4"/>
             
              <div className="row d-flex flex-row-reverse justify-content-center m-0">
                
                  <div className="col-lg-4 col-md-12">
                    <h5>Vision</h5>

                    <p className="small text-muted text-uppercase mb-0">Component subheading</p>
                    <p className="small text-muted mb-2">
                      
                    </p>

                    <h6>Component alternative subheading (h6)</h6>

                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. A nemo commodi odio veniam
                      nisi? Cupiditate nobis doloremque unde in ut, consequatur reprehenderit saepe iure
                      perspiciatis, veniam facilis asperiores deleniti at?
                    </p>

                  </div>
                  <div className="col-lg-4 col-md-12 mb-4 d-flex justify-content-center">
                  <img src={visionLogo}
                    alt="" className="img-fluid m-auto"
                    style={{objectFit:"cover", height:190,zIndex: 1}}/>
                </div>

              </div>
             
              <div className="row d-flex justify-content-center m-0">
                  <div className="col-lg-4 col-md-12">
                    <h5>Mission</h5>

                    <p className="small text-muted text-uppercase mb-0">Component subheading</p>
                    <p className="small text-muted mb-2">
                      
                    </p>

                    <h6>Component alternative subheading (h6)</h6>

                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. A nemo commodi odio veniam
                      nisi? Cupiditate nobis doloremque unde in ut, consequatur reprehenderit saepe iure
                      perspiciatis, veniam facilis asperiores deleniti at?
                    </p>

                  </div>
                  <div className="col-lg-4 col-md-12 mb-4 d-flex justify-content-center">
                  <img src={missionLogo}
                    alt="" className="img-fluid m-auto"
                    style={{objectFit:"cover", height:190,zIndex: 1}}/>

                  </div>
              </div>
              
            </div>
            <hr/>
            <div className="container madeWithLinks">
              <div className="row text-center">
                <div className="col">
                  Made With:
                </div>
             </div>

              <div className="row text-muted">
                <div className="col col-md-4">
                  <div className="row">
                    <div className="col-md-6" >
                    <a href="https://www.mongodb.com/"><img src={MongoDBLogo} className="img-fluid madeWith" />MongoDB</a>
                    </div>
                    <div className="col-md-6">
                    <a href="https://expressjs.com/"><img src={ExpressLogo} className="img-fluid madeWith" />Express</a>
                    </div> 
                  </div>
                </div>
                <div className="col col-md-4">
                  <div className="row mb-3">
                    <div className="col-md-6">
                    <a href="https://reactjs.org/"><img src={ReactLogo} className="img-fluid madeWith" />React</a>
                    </div>
                    <div className="col-md-6">
                    <a href="https://nodejs.org/en/"><img src={NodeLogo} className="img-fluid madeWith"/>
                    Node</a></div> 
                  </div>
                </div>
                <div className="col col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                    <a href="https://getbootstrap.com/"><img src={BootstrapLogo} className="img-fluid madeWith" id="bsLogo"/>
                    Bootstrap</a></div>
                    <div className="col-md-6">
                    <a href="https://www.passportjs.org/"><img src={PassportLogo} className="img-fluid madeWith" />
                    Passport</a></div> 
                  </div>
                </div>
              </div>

            </div>
            <footer className="bg-light text-center text-lg-start">
  

            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
              © 2023 Copyright: 
              <a className="text-dark m-1"  href="https://mdbootstrap.com/">Elijah Monjardin</a> - All rights reserved.

            </div>

           
          </footer>
            
          </section>
      )
    }

    return(
      <div className="container-fluid p-0" >
      <NavigationBar/>
        {showAbout()}
      </div>
        
    )
} 

export default About