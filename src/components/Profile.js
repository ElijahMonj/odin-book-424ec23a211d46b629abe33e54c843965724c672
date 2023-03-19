import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink,useSearchParams} from 'react-router-dom'
import axios from 'axios';
import NavigationBar from './Navbar'

import { useNavigate } from 'react-router-dom';
function Profile(){
    const URL=process.env.REACT_APP_API_URL
    const [searchParams,setSearchParams]=useSearchParams()
    const showUser=searchParams.get('user')
    
    const [user, setUser]=useState(0)
    const navigate = useNavigate();
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
    async function follow(){
        let token=window.localStorage.getItem("token");
        try {         
            axios({
                method: "PATCH",
                data:{
                    tofollow:showUser
                },
                withCredentials: true,
                url: URL+"addfollowing/"+user.currentUser._id+"/"+showUser+"/",
              }).then((res) => refresh());

         } catch (error) {
             console.log(error)
         }
         try {
            
            axios({
                method: "PATCH",
                data:{
                    followby:user.currentUser._id
                },
                withCredentials: true,
                url:URL+"addfollowers/"+showUser+"/"+user.currentUser._id+"/",
              }).then((res) => refresh());


         } catch (error) {
             console.log(error)
         }
         refresh()

    }
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

    async function unfollow(){
        
        try {
             
            axios({
                method: "PATCH",
                data:{
                    toremove:showUser
                },
                withCredentials: true,
                url:URL+"removefollowing/"+user.currentUser._id+"/"+showUser+"/",
              }).then((res) => refresh());

         } catch (error) {
             console.log(error)
         }
         try {
            
            axios({
                method: "PATCH",
                data:{
                    removeby:user.currentUser._id
                },
                withCredentials: true,
                url:URL+"removefollowers/"+showUser+"/"+user.currentUser._id+"/",
              }).then((res) => refresh());
         
         } catch (error) {
             console.log(error)
         }
         refresh()

    }
    function isAuthenticated(){
        if(user===0){
            return(
                <div className="container-fluid h-75 d-flex justify-content-center flex-column align-items-center">
                    <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            )
        }else if(user===1||user.username==="Please Login"){
            navigate('/')
        }
        else if (user.username!=="Please Login"){
            if(showUser===user.currentUser._id){
                navigate('/myprofile')
            }else{
            if(showUser===""){
                return(
                    <div className="fs-1 text-muted h-75 d-inline-block w-100 d-flex justify-content-center align-items-center">Invalid Link.</div>
                )
            }else if(showUser===null){
                navigate(`/myprofile`);
            }        
            else{ 
                let userProfile=user.users.find(u=>u._id===showUser)
                function getFollowers(){
                    if((userProfile.followers.length===0)){
                        return(
                            <div> No followers yet.</div>
                        )
                    }else{
                        return(
                            <div className="list-group ">
                            
                               {userProfile.followers.map(function (f, idx) {
                                    function findName(){
                                                var uu = user.users.find(item => item._id === f);
                                                return uu.firstName+" "+uu.lastName
                                            }
                                    function findEmail(){
                                        var uu = user.users.find(item => item._id === f);
                                        return uu.email
                                    }
                                    function findPicture(){
                                        var uu = user.users.find(item => item._id === f);
                                        return uu.defaultProfile
                                    }
                                    
                                    return(
                                        <a href={"/profile/?user="+f} key={idx} className="list-group-item list-group-item-action list-group-item-dark card p-2" style={{maxWidth: 540}}>
                                        
                                            <div className="row g-0" style={{gap:10}}>
                                                <div className="col-md-2">
                                                <img src={findPicture()} className="img-fluid rounded img-thumbnail" alt="profile"
                                                    style={{ maxWidth: 70, maxHeight: 70, minHeight: 70, minWidth: 70, objectFit: "cover", zIndex: 1 }} 
                                                />
                                                </div>
                                                <div className="col text-start d-flex justify-content-center flex-column">
                                                <div className="card-body p-0 d-flex justify-content-center flex-column" >
                                                    <h6 className="card-text text-break m-0 d-flex justify-content-start">{findName()}</h6>
                                                    <p className="card-text text-break"><small className="text-muted d-flex justify-content-start">{findEmail()}</small></p>
                                                </div>
                                                </div>
                                            </div>
                                            
                                        </a>
                                    )
                               })}
                              
        
        
                            </div>
                        )
                    }
                    
                }
    
                function getFollowing(){
                    if(userProfile.following.length===0){
                        return(
                            <div> This user is not following anyone.</div>
                        )
                    }else{
                        return(
                            <div className="list-group ">
                            
                               {userProfile.following.map(function (f, idx) {
                                    function findName(){
                                                var uu = user.users.find(item => item._id === f);
                                                return uu.firstName+" "+uu.lastName
                                            }
                                    function findEmail(){
                                        var uu = user.users.find(item => item._id === f);
                                        return uu.email
                                    }
                                    function findPicture(){
                                        var uu = user.users.find(item => item._id === f);
                                        return uu.defaultProfile
                                    }
                                    return(
                                        <a href={"/profile/?user="+f} key={idx} className="list-group-item list-group-item-action list-group-item-dark card p-2" style={{maxWidth: 540}}>
                                        
                                            <div className="row g-0" style={{gap:10}}>
                                                <div className="col-md-2">
                                                <img src={findPicture()} className="img-fluid rounded img-thumbnail" alt="profile"
                                                    style={{ maxWidth: 70, maxHeight: 70, minHeight: 70, minWidth: 70, objectFit: "cover", zIndex: 1 }} 
                                                />
                                                </div>
                                                <div className="col text-start d-flex justify-content-center flex-column">
                                                <div className="card-body p-0 d-flex justify-content-center flex-column" >
                                                    <h6 className="card-text text-break m-0 d-flex justify-content-start">{findName()}</h6>
                                                    <p className="card-text text-break"><small className="text-muted d-flex justify-content-start">{findEmail()}</small></p>
                                                </div>
                                                </div>
                                            </div>
                                            
                                        </a>
                                    )
                               })}
        
                            </div>
                        )
                    }
                    
                }
                if(userProfile===undefined){
                    return(
                        <div className="fs-1 text-muted h-75 d-inline-block w-100 d-flex justify-content-center align-items-center">Invalid Link.</div>
                    )
                }else{
                    function isFollowed(){
                        console.log(user.currentUser._id)
                        if(user.currentUser.following.includes(userProfile._id)){
                            return(
                                <button className="btn btn-outline-dark btn-sm" id="unfollow" onClick={unfollow}>Unfollow</button>
                            )
                        }else{
                            return(
                                <button className="btn btn-dark btn-sm" id="follow" onClick={follow}>Follow</button>
                            )
                        }
                        
                    }
                    function checkPost(){  
                        if (userProfile.posts.length===0){
                          return (<div className="text-muted text-center">No posts yet.</div>)
                        }else{
                            return (<div className="text-muted text-center">End of posts.</div>)
                        }
                    }
                    return(
                        <section className="h-100 gradient-custom-2">
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center pt-5">
                                <div className="col col-lg-9 col-xl-7">
                                    <div className="card">
                                    <div className="rounded-top text-white row p-0 m-0" id="coverBackground">
                                        <div className="ms-4 d-flex col-sm-4 ps-0" style={{width: 150}}>
                                        <img src={userProfile.defaultProfile}
                                            alt="" className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{maxWidth: 150, maxHeight: 150,minHeight: 150, minWidth: 150,objectFit:"cover",zIndex: 1}}/>
                                        
                                        </div>
                                        <div className="ms-3 col-sm-8 d-flex align-items-end">
                                            <div>
                                                <h5 className="text-break">{userProfile.firstName+" "+userProfile.lastName}</h5>
                                                <p className="text-break">{userProfile.email}</p>
                                            </div>       
                                        </div>
                                    </div>
                                    <div className="p-4 text-black d-flex justify-content-between" style={{backgroundColor: "#f8f9fa"}}>
                                        <div className="mt-auto mb-auto">
                                            {isFollowed()}
                                        </div>
                                    
                                        <div className="d-flex justify-content-end text-center py-1">
                                        
                                        <div>
                                            <p className="mb-1 h5">{userProfile.posts.length}</p>
                                            <a href="#recentPosts" id="nameLink" className="small text-muted mb-0">Posts</a>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-1 h5">{userProfile.followers.length}</p>
                                            <a className="small text-muted mb-0" data-bs-toggle="modal" data-bs-target="#followers" id="nameLink">Followers</a>

                                                <div className="modal fade" id="followers" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Followers</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                    {getFollowers()}
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="postButton">Close</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                        </div>
                                        <div>
                                            <p className="mb-1 h5">{userProfile.following.length}</p>
                                            <a className="small text-muted mb-0" data-bs-toggle="modal" data-bs-target="#following" id="nameLink">Following</a>
                                                <div className="modal fade" id="following" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog ">
                                                    <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Following</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                    
                                                   {getFollowing()}
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="postButton">Close</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 text-black">
                                        <div className="mb-5">
                                        <div className="d-flex justify-content-between align-items-center">
                                        <p className="lead fw-normal mb-1">About</p>
                                        
                                        </div>
                                        
                                        <div className="p-4" style={{backgroundColor: "#f8f9fa"}}>
                                            <p className="font-italic mb-1">{userProfile.bio}</p>
                                        </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0" id="recentPosts">Recent posts</p>
                                        
                                        </div>



                                        {userProfile.posts.map(function (p, idx) {
                                            async function newComment(e) {
                                                e.preventDefault()
                                                console.log(e)
                                                let token = window.localStorage.getItem("token");

                                                const d = new Date();
                                                const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                                let date = month[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear()
                                                let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

                                                const postDate = date + ", " + time

                                                try {
                                                    
                                                    axios({
                                                        method: "PATCH",
                                                        data:{
                                                            author_id: user.currentUser._id,
                                                            date: postDate,
                                                            content: document.getElementById('writeComment'+p.id).value
                                                        },
                                                        withCredentials: true,
                                                        url: URL + p.author + "/posts/" + p.id + "/newComment",
                                                    }).then((res) => refresh());
                                                    document.getElementById('writeComment'+p.id).value = ""
                                                    refresh()
                                                } catch (error) {
                                                    console.log(error)
                                                }


                                            }
                                            let modalID;
                                            function withImage() {
                                                if (p.picture == "none") {

                                                } else {
                                                    return (
                                                        <img className="border-top border-bottom" src={p.picture} />
                                                    )
                                                }

                                            }
                                            function findName() {
                                                var uu = user.users.find(item => item._id === p.author);
                                                return uu.firstName + " " + uu.lastName
                                            }
                                            return (
                                                <div className="card m-auto mb-5" key={idx}>
                                                    <div className="card-body">
                                                    <div className="d-flex">
                                                    <a href={"/profile/?user="+userProfile._id}>
                                                    <img className="me-2" style={{minHeight:40, minWidth:40, height:40, width:40, objectFit:"cover",borderRadius: 150 / 2,overflow:"hidden"}} 
                                                    src={userProfile.defaultProfile}>
                                                    </img></a>
                                                    <h4 className="m-0 d-flex flex-column justify-content-center text-break">
                                                    <a href= {"/profile/?user="+p.author} className="text-dark" id="nameLink">
                                                                {findName()}
                                                    </a></h4>
                                                 </div>
                                                        <p className="card-text mt-3">{p.caption}</p>
                                                        <p className="card-text"><small className="text-muted">{p.date}</small></p>
                                                    </div>
                                                    {withImage()}
                                                    <div className="btn-group mt-1" role="group" aria-label="Basic example">
                                                        
                                                        <button type="button" className="btn btn-sm" id="postButton" 
                                                            data-bs-toggle="modal" data-bs-target={"#id" + p.id}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat me-2" style={{ marginBottom: 3 }} viewBox="0 0 16 16">
                                                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                                                            </svg>Comment</button>
                                                        <div className="modal fade " id={"id" + p.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-lg modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
                                                                <div className="modal-content">
                                                                   
                                                                    <div className="modal-header">
                                                                        <div className="modal-title fs-5 d-flex" id="exampleModalLabel">
                                                                        <a href={"/profile/?user="+userProfile._id}>
                                                                        <img className="me-2" style={{minHeight:40, minWidth:40, height:40, width:40, objectFit:"cover",borderRadius: 150 / 2,overflow:"hidden"}} 
                                                                        src={userProfile.defaultProfile}></img></a>
                                                                        <div className="d-flex flex-column justify-content-center">
                                                                            <div className="text-break">
                                                                            <a href= {"/profile/?user="+p.author} className="text-dark" id="nameLink">
                                                                            {findName()}
                                                                            </a>
                                                                            </div>
                                                                            <small className="text-muted" style={{fontSize:15}}>
                                                                            {p.date}
                                                                            </small>
                                                                        </div>
                                                                        
                                                                        </div>
                                                                        
                                                                        <button type="button" className="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body text-break">
                                                                        {p.caption}
                                                                        <div className="card" style={{ border: 0 }}>
                                                                    
                                                                            {withImage()}
                                                                            
                                                                            <hr></hr>
                                                                            <div className="card-body">
                                                                                <h5 className="text-center" >Recent Comments</h5>

                                                                                <div className="row">
                                                                                    <div className="col">

                                                                                        {p.comments.map(function (comment, idc) {
                                                                                            if (p.comments === []) {

                                                                                                return (
                                                                                                    <div key={idc}>No comments yet.</div>
                                                                                                )
                                                                                            } else {

                                                                                                function findProfilePic() {
                                                                                                    var pp = user.users.find(item => item._id === comment.author_id);
                                                                                                    return pp.defaultProfile
                                                                                                }
                                                                                                function findName() {
                                                                                                    var uu = user.users.find(item => item._id === comment.author_id);
                                                                                                    return uu.firstName + " " + uu.lastName
                                                                                                }

                                                                                                return (
                                                                                                    <div className="d-flex flex-start my-2" key={idc}>
                                                                                                        <a href={"/profile/?user="+comment.author_id}>
                                                                                                        <img className="rounded-circle shadow-1-strong me-3"
                                                                                                            src={findProfilePic()} alt="avatar"style={{height:50,width:50,objectFit:"cover"}} />
                                                                                                        </a>
                                                                                                        <div className="flex-grow-1 flex-shrink-1">
                                                                                                        <div className="forPadding">
                                                                                                                <div className="d-flex  flex-column">
                                                                                                                    <p className="m-0 text-break">
                                                                                                                    <a href= {"/profile/?user="+comment.author_id} className="text-dark" id="nameLink">
                                                                                                                    {findName()}
                                                                                                                    </a>
                                                                                                                    </p>
                                                                                                                    <span className="small text-muted text-break">{comment.date} </span>

                                                                                                                </div>
                                                                                                                <p className="mb-0 text-break">
                                                                                                                    {comment.content}
                                                                                                                </p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            }

                                                                                        })}

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="modal-footer pb-0">
                                                                        <div className="w-100 m-0 d-flex justify-content-center">
                                                                            <img className="" style={{ height: 40, width: 40, objectFit: "cover", borderRadius: 150 / 2, overflow: "hidden" }}
                                                                                src={user.currentUser.defaultProfile}></img>
                                                                            <form className="input-group ms-2" onSubmit={newComment}>
                                                                                <div className="input-group mb-3">
                                                                                    <input type="text" className="form-control" minLength={2}
                                                                                    placeholder="Write a public comment..."
                                                                                        aria-label="Write a public comment..." aria-describedby="button-addon2" id={"writeComment"+p.id} />
                                                                                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                                                                            <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        
                                                    </div>
                                                </div>

                                            )
                                        })}
                                        
                                        {checkPost()}
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </section>
                    )
                }
                
            }
        }
        }
        
    }

    return(
        <div className="container-fluid p-0">
        <NavigationBar></NavigationBar>
           {isAuthenticated()}
            
        </div>
    )
} 

export default Profile