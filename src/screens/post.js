import React, { useEffect, useState } from "react";
import posta from "../addpost.png";
import pimage from "../p1.png";
import home from "../home.png";
import post from "../post1.png";
import settings from "../findf.png";
import friends from "../friendl.png";
// import msg from "../message.png";
import logout from "../logout.png";
import mainimage from "../postlogo.png"
import '../App.css'
import { useNavigate ,useLocation} from "react-router-dom";

function Post() {
  const navigate =useNavigate()
  // const[like,setlike]=useState(true)
  const[mob,setmob]=useState('')

  const[postpic,setpostpic]=useState('')
  const[postbio,setpostbio]=useState('')
  const[postcomment,setpostcomment]=useState('')
  const[commentpic,setcommentpic]=useState('')
  const[commentmobile,setcommentmobile]=useState('')

  const[error,seterror]=useState('')
  

  // const[totalpost,settotalpost]=useState([])
  // const[totalprofile,settotalprofile]=useState([])
  const[friendlist,setfriendlist]=useState([])
  const[followlist,setfollowlist]=useState([])
  const[friendspost,setfriendspost]=useState([])
  const[defpost,setdefpost]=useState([])
  // const[exam,setexam]=useState()
  
  // const [color,setColor] = useState(0);
  
  let value=useLocation()
  
  useEffect(()=>{
    seterror('')
    getdefpostfun()
    loopfun()
  },[])

  

  const getdefpostfun=async()=>{
    setmob(value.state)
    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({}),
        redirect: 'follow'
      };
    
      await fetch('http://localhost:6222/getdefpostdb', requestOptions)
      .then(response => response.json())
      .then((params) => {
        setdefpost(params)
        loopfun()
     })
  }

  const loopfun=async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({mobile:value.state}),
      redirect: 'follow'
    };
  
    await fetch('http://localhost:6222/expertdb', requestOptions)
    .then(response => response.json())
    .then((params) => {
      setfriendspost(params.sucess)
    })
   
  }



 const Addpostfun=async()=>{
  let verifyl=/^(http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/
  let count=0
  seterror('')
  if(verifyl.test(postpic)){
    count++
  }else{
    seterror('*Profile photo link should be valid and in http format')
  }
  if(postbio.length >= 3 ){
    count++
  }else{
    seterror('* profile bio length should be greater than 3 ')
  }
  if(count===2){
    count=0
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({mobile:mob,pphoto:postpic,pbio:postbio}),
        redirect: 'follow'
      };
    
      await fetch('http://localhost:6222/addpostdb', requestOptions)
      .then(response => response.json())
      .then((params) => {
        if(params.sucess === 'Post uploded'){
          alert(params.sucess)
          
        }else{
          alert(params.error)
        }
      })
    }else{
      count=0
      
    }    
    setpostpic('')
    setpostbio('')
  }

  const findfriends=async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({mobile:value.state}),
      redirect: 'follow'
    };
  
    await fetch('http://localhost:6222/getfindfriendsdb', requestOptions)
    .then(response => response.json())
    .then((params) => {
      setfollowlist(params.sucess)
     }) 
  }
  

  const friendslist=async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({mobile:value.state}),
      redirect: 'follow'
    };
    
    await fetch('http://localhost:6222/getfriendslistdb', requestOptions)
    .then(response => response.json())
    .then((params) => {
      setfriendlist(params.sucess)
    })
  }

 

  const addfriend=async(mob1,name)=>{
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({umobile:mob1,username:name,mobile:value.state}),
      redirect: 'follow'
    };
  
    await fetch('http://localhost:6222/insertfriendsdb', requestOptions)
    .then(response => response.json())
    .then((params) => {
      alert(params.sucess)
      findfriends()
      loopfun()
      
    })
  }

  const unfollowfriend =async(mob1,name)=>{
    
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({umobile:mob1,username:name,mobile:value.state}),
      redirect: 'follow'
    };
  
    await fetch('http://localhost:6222/removefriendsdb', requestOptions)
    .then(response => response.json())
    .then((params) => {
      alert(params.sucess)
      friendslist()
      loopfun()
      
   })
  }
  const commentfun=async()=>{
    if(postcomment.length >= 3){
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({mobile:value.state,postpic:commentpic,comment:postcomment,picmobile:commentmobile}),
        redirect: 'follow'
      };
    
      await fetch('http://localhost:6222/insertcommentotheruserdb', requestOptions)
      .then(response => response.json())
      .then((params) => {
        alert(params.sucess)
        getdefpostfun()
     })
    }  
  }

  const commentfun1=async()=>{
    if(postcomment.length >= 3){
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({mobile:value.state,postpic:commentpic,comment:postcomment,picmobile:commentmobile}),
        redirect: 'follow'
      };
    
      await fetch('http://localhost:6222/insertcommentother1userdb', requestOptions)
      .then(response => response.json())
      .then((params) => {
        alert(params.sucess)
        loopfun()
     })
    }
  }

  const likefun=async(postpic,usermobile)=>{
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({mobile:value.state,postpic:postpic,umobile:usermobile}),
      redirect: 'follow'
    };
  
    await fetch('http://localhost:6222/postlikedb', requestOptions)
    .then(response => response.json())
    .then((params) => {
      alert(params.sucess)
      loopfun()

   })
   
}

const deflikefun=async(postpic,usermobile)=>{
  const requestOptions = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({mobile:value.state,postpic:postpic,umobile:usermobile}),
    redirect: 'follow'
  };

  await fetch('http://localhost:6222/defpostlikedb', requestOptions)
  .then(response => response.json())
  .then((params) => {
    alert(params.sucess)
    getdefpostfun()

 })
}


  


  return (
    <div style={{width:'100%',minHeight:'500px',minWidth:'500px'}}>
        <div >
      <nav className="navbar navbar-expand navbar-dark position-fixed gradient-custom  " style={{width:'100%',zIndex:10}}>
        <div className="container-fluid " >
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
              <li className="nav-item text-center mx-2 mx-lg-1 d-flex">
                <img
                  style={{ alignItems: "center", marginLeft: "20%" ,alignItems:'center'}}
                  height={'60px'}
                  width={"50px"}
                  src={pimage}
                  alt="P"
                />
                <button className="btn   d-lg-none d-xl-none " type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-expanded="false" aria-controls="collapseExample">
               <span className="navbar-toggler-icon"></span>
             </button>
              </li>
            </ul>
            
            <form className="d-flex input-group w-auto ms-lg-3 my-3 my-lg-0">
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                style={{zIndex:0}}
              />
              <button
                className="btn btn-outline-white"
                type="button"
                data-mdb-ripple-color="dark"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      </div>


      <nav id="sidebarMenu" style={{top:'25%',position:'absolute',zIndex:0,}} className="collapse d-lg-none d-xl-none navbar-dark gradient-sidebar  ">
    <div className="position-fixed">
      <div className="list-group list-group-flush mx-3 mt-5 gap-3  ">
        <button className="d-flex list-group-item list-group-item-action py-3 ripple w-75"><i
            className="fas fa-home fa-fw me-3"></i></button>
        <button className="d-flex list-group-item list-group-item-action py-3 ripple w-75">
          <i className="fas fa-clapperboard fa-fw me-3"></i>
        </button>
        <button className="d-flex list-group-item list-group-item-action py-3 ripple w-75"><i
            className="fas fa-id-badge fa-fw me-3"></i></button>
        <button className="d-flex list-group-item list-group-item-action py-3 ripple w-75"><i
            className="fas fa-message fa-fw me-3"></i></button>
        <button  className="d-flex list-group-item list-group-item-action py-3 ripple w-75"><i
            className="fas fa-gear fa-fw me-3"></i></button>
        <button className="d-flex list-group-item list-group-item-action py-3 ripple w-75"><i
            className="fas fa-building fa-fw me-3"></i></button>
       
      </div>
    </div>
    
  </nav>
  
      <div className="row " style={{width:'100%',minHeight:'400px',height:'90vh',}}>
      <div className="position-fixed ">
        <div style={{height:'100%',width:'100%',left:0,marginLeft:'0%'}}>
  <nav id="sidebarMenu" style={{width:'17%',height:'100%',minHeight:'650px',position:'relative',marginTop:'77px'}} className="col-lg-2 d-none   d-lg-block d-xl-block  sidebar navbar-dark gradient-sidebar  ">
   
      <div className="list-group list-group-flush mx-3 gap-2  ">
        <button className=" d-flex list-group-item list-group-item-action py-2 ripple " onClick={()=>{navigate("/Home",{state:mob})}}><i
            className="fas   me-3 "></i><span className="d-none d-md-block d-lg-block   " ><div style={{display:'flex',gap:'10px',alignItems:'center',}}><img src={home} width={30}height={30}/><span className="mt-1" style={{fontSize:'1.3vw',fontFamily:'inherit'}}>Home</span></div></span></button>
        <button className="d-flex list-group-item list-group-item-action py-2 ripple" ><i
            className="fas   me-3"></i><span className="d-none d-md-block d-lg-block"><div style={{display:'flex',gap:'10px',alignItems:'center',}}><img src={post} width={30}height={30}/><span className="mt-1" style={{fontSize:'1.3vw',fontFamily:'inherit'}}>Post</span></div></span></button>
            <button className="d-flex list-group-item list-group-item-action py-2 ripple" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
          <i className="fas   me-3"></i><span className="d-none d-md-block d-lg-block"><div style={{display:'flex',gap:'10px',alignItems:'center',}}><img src={posta} width={30}height={30}/><span className="mt-1" style={{fontSize:'1.3vw',fontFamily:'inherit'}}>Add Post</span></div></span>
        </button>
        <button className="d-flex list-group-item list-group-item-action py-2 ripple"  type="button" data-bs-toggle="modal" data-bs-target="#friendsModal" onClick={()=>{findfriends()}}>
          <i className="fas   me-3"></i><span className="d-none d-md-block d-lg-block"><div style={{display:'flex',gap:'10px',alignItems:'center',}}><img src={settings} width={30}height={30}/><span className="mt-1" style={{fontSize:'1.3vw',fontFamily:'inherit'}}>Find Friends</span></div></span>
        </button>
        <button className="d-flex list-group-item list-group-item-action py-2 ripple"  type="button" data-bs-toggle="modal" data-bs-target="#friendslistModal" onClick={()=>{friendslist()}}>
          <i className="fas   me-3"></i><span className="d-none d-md-block d-lg-block"><div style={{display:'flex',gap:'10px',alignItems:'center',}}><img src={friends} width={30}height={30}/><span className="mt-1" style={{fontSize:'1.3vw',fontFamily:'inherit'}}>Friends</span></div></span>
        </button>
        <button className="d-flex list-group-item list-group-item-action py-2 ripple"><i
            className="fas  me-3"></i><span className="d-none d-md-block d-lg-block"><div style={{display:'flex',gap:'10px',alignItems:'center',}}><img src={logout} width={35}height={35}/><span className="mt-1" style={{fontSize:'1.3vw',fontFamily:'inherit'}}>Logout</span></div></span></button>
      </div>

        <div className="d-lg-block d-xl-block d-none" style={{position:'absolute',bottom:0}}>
          <img src={mainimage} width={'100%'}height={'100%'}/> 
        </div>


  </nav>
  </div>
  </div>


  
  <div style={{width:'55%',height:'100vh',marginLeft:'25%',marginTop:'70px',minHeight:'500px',minWidth:'500px'}} className="col-lg-8 col-12 col-md-8 bodypost ">
  
         
        
        <div style={{display:'flex',justifyContent:'center'}}>
        <span style={{width:'90%',marginTop:'40px',marginBottom:'50px',minHeight:'250px',minWidth:'250px',background:'#D4D4D4',borderRadius:'10px',}} className="shadow2" >
          <div style={{display:'flex',justifyContent:'center'}}>
            <h3 style={{fontFamily:'serif',marginTop:'4%'}}>Post</h3>
          </div>
        
          { defpost?.map((element,index)=>{
            return(
         <>
              {defpost[0].post?.map((ele,ind)=>{
                return(
                    <div style={{}} key={ind}>
                    <div style={{display:'flex',gap:'15px'}}>
                    <img style={{height:'50px',width:'50px',borderRadius:'25px',marginLeft:'100px'}} src={element?.profilepic}></img>
                    <h5 style={{marginTop:'19px'}}>{element?.username}</h5>
                    </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <span style={{width:'500px',background:'#ffffff',borderRadius:'10px',justifyContent:'center',marginTop:'10px',marginBottom:'10px'}}>
                      <span style={{margin:'20px',fontFamily:'cursive',fontSize:'15px',marginTop:'10px'}}>{ele?.postbio}</span>
                    <img style={{height:'430px',width:'480px',borderRadius:'10px',margin:'10px'}} className="picshadow" src={ele?.postpic}></img>
                    <div style={{display:'flex' ,marginLeft:'50px',gap:'20px',marginTop:'5px',}}> 
      
                    <button  style={{border:'0px solid',backgroundColor:'#ffffff'}} onClick={()=>{deflikefun(ele.postpic,element.username)}}><i style={{fontSize:'30px' }} className=" fa-regular fa-thumbs-up fa-shake"></i></button>
                    {/* {like_unlike.includes(index) ?                                                 
                        <span onPress={()=>Like_unlike(index)}>  
                            <img src={element?.postpic} style={{height:25,width:25.5}}/>  
                        </span>
                           : 
                        <span onPress={()=>Like_unlike(index)}>
                            { 
                            state ? <img src={element?.postpic} style={{height:25,width:25.5}}/> : 
                            <img source={require('./logos/like.png')} style={{height:25,width:25.5}}/>
                            }
                        </span>
                      } */}
                      {/* {like?<span onClick={()=>setColor()} style={{border:'0px solid'}}><i style={{fontSize:'30px'}} className=" fa-regular fa-thumbs-up fa-shake"></i></span>:
                      <span onClick={()=>{setlike(true)}} style={{border:'0px solid'}}><i style={{fontSize:'30px'}} className="text-danger fa-regular fa-thumbs-up fa-shake"></i></span>} */}
                      <div style={{display:'flex',gap:'5px',marginTop:'5px'}}>
                        <h5 style={{fontFamily:'cursive'}}> {defpost[index].post[ind].likes.length}</h5> 
                      <h5  style={{fontFamily:'cursive'}}>liked</h5>
                      </div>
                      <button  type="button" data-bs-toggle="modal" data-bs-target="#myModal" style={{border:'0px solid',marginLeft:'110px',backgroundColor:'#ffffff'}}> <i style={{fontSize:'30px'}} className="fa-sharp fa-regular fa-comment fa-fade" onClick={()=>{{setcommentpic(ele.postpic)}{setcommentmobile(element.username)}}}></i></button>
                      <div style={{display:'flex',gap:'5px',marginTop:'5px'}}>
                        <h5 style={{fontFamily:'cursive'}}> {defpost[index].post[ind].comments.length}</h5> 
                      <h5  style={{fontFamily:'cursive'}}>Comments</h5>
                      </div>  
                    </div>
                    <span>
                <div style={{display:'flex',justifyContent:'center'}}>  
                <h5 style={{}}>comments</h5>
                </div>
                {defpost[0].post[ind].comments?.map((ele,ind)=>{
                  return(
                    <span>
                      <div style={{display:'flex',gap:'10px',marginLeft:'30px'}}>
                        <h6>{ele?.mobile} :</h6>
                        <h6>{ele?.comment}</h6>

                      </div>
                    </span>
                  )
                })}
              </span>
                     </span>
                     
                      <hr/>
                     
                  </div>
                  </div> 
                )
              })}

               
            </>
            )
           })}

{ friendspost?.map((element,index)=>{
            return(
         <>
              {friendspost[index].post?.map((ele,ind)=>{
                return(
                    <div style={{}}>
                    <div style={{display:'flex',gap:'15px'}}>
                    <img style={{height:'50px',width:'50px',borderRadius:'25px',marginLeft:'100px'}} src={element?.profilepic}></img>
                    <h5 style={{marginTop:'19px'}}>{element?.username}</h5>
                    </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <span style={{width:'500px',background:'#ffffff',borderRadius:'10px',justifyContent:'center',marginTop:'10px',marginBottom:'10px'}}>
                      <span style={{margin:'20px',fontFamily:'cursive',fontSize:'15px',marginTop:'10px'}}>{ele?.postbio}</span>
                    <img style={{height:'430px',width:'480px',borderRadius:'10px',margin:'10px'}} className="picshadow"  src={ele?.postpic}></img>
                    <div style={{display:'flex' ,marginLeft:'50px',gap:'20px',marginTop:'5px'}}> 
                    <button  style={{border:'0px solid',backgroundColor:'#ffffff'}} onClick={()=>{likefun(ele.postpic,element.mobile)}}><i style={{fontSize:'30px'}} className=" fa-regular fa-thumbs-up fa-shake"></i></button>
      
                    {/* {like_unlike.includes(index) ?                                                 
                        <span onPress={()=>Like_unlike(index)}>  
                            <img src={element?.postpic} style={{height:25,width:25.5}}/>  
                        </span>
                           : 
                        <span onPress={()=>Like_unlike(index)}>
                            { 
                            state ? <img src={element?.postpic} style={{height:25,width:25.5}}/> : 
                            <img source={require('./logos/like.png')} style={{height:25,width:25.5}}/>
                            }
                        </span>
                      } */}
                      {/* {like?<span onClick={()=>setColor()} style={{border:'0px solid'}}><i style={{fontSize:'30px'}} className=" fa-regular fa-thumbs-up fa-shake"></i></span>: */}
                      {/* <span onClick={()=>{setlike(true)}} style={{border:'0px solid'}}><i style={{fontSize:'30px'}} className="text-danger fa-regular fa-thumbs-up fa-shake"></i></span>} */}
                      <div style={{display:'flex',gap:'5px',marginTop:'5px'}}>
                        <h5 style={{fontFamily:'cursive'}}> {friendspost[index].post[ind].likes.length}</h5> 
                      <h5  style={{fontFamily:'cursive'}}>liked</h5>
                      </div>
                      <button  type="button" data-bs-toggle="modal" data-bs-target="#myModal1" style={{border:'0px solid',marginLeft:'110px',backgroundColor:'#ffffff'}}> <i style={{fontSize:'30px'}} className="fa-sharp fa-regular fa-comment fa-fade" onClick={()=>{{setcommentpic(ele.postpic)}{setcommentmobile(element.mobile)}}}></i></button>
                      <div style={{display:'flex',gap:'5px',marginTop:'5px'}}>
                        <h5 style={{fontFamily:'cursive'}}> {friendspost[index].post[ind].comments.length}</h5> 
                      <h5  style={{fontFamily:'cursive'}}>Comments</h5>
                      </div>     
                    </div>
                    <span>
                <div style={{display:'flex',justifyContent:'center'}}>
                <h5 style={{}}>comments</h5>
                </div>
                {friendspost[index].post[ind].comments?.map((ele,ind)=>{
                  return(
                    <span>
                      <div style={{display:'flex',gap:'10px',marginLeft:'30px'}}>
                        <h6>{ele?.mobile} :</h6>
                        <h6>{ele?.comment}</h6>

                      </div>
                    </span>
                  )
                })}
              </span>
                     </span>
                  </div>
                  </div> 
                )
              })}

               
            </>
            )
           })}
          

         </span>
        </div> 
 
        
    
  </div>
                   <div id="friendsModal" className="modal fade" role="dialog">
                      <div className="modal-dialog">
                    
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                           
                            <h4 className="modal-title">Find Friends</h4>
                          </div>
                          <div className="modal-body "style={{backgroundColor:'#D2D2D2'}}>
                          { followlist.map((element,index)=>{
                            return(
                              <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
                              <div style={{height:'90px',width:'400px',borderRadius:'10px',backgroundColor:'#ffffff'}}>
                                <div style={{display:'flex',alignContent:'center',marginTop:'10px',gap:'10px'}}>
                                  <img style={{height:'70px',width:'70px',borderRadius:'25px',marginLeft:'10px'}} src={element?.profilepic}></img>
                                  <h5  style={{marginTop:'35px',marginLeft:'20px'}}>{element.username}</h5>
                                  <div style={{position:'absolute',right:80}}>
                                    <button style={{height:'40px',width:'80px',borderRadius:'5px',backgroundColor:'#29A3FF',marginTop:'15px'}} onClick={()=>{addfriend(element.mobile,element.username)}}><h5 style={{marginTop:'3px',fontFamily:'cursive'}}>Follow</h5></button>
                                  </div>
                                  
                                </div>
  
                              </div>
  
                            </div>
                            )
                          })}
                          
                          </div>
                          <div className="modal-footer">

                            <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                    
                      </div>
                    </div>
                 

                    <div id="friendslistModal" className="modal fade" role="dialog">
                      <div className="modal-dialog">
                    
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                           
                            <h4 className="modal-title">Friends</h4>
                          </div>
                          <div className="modal-body "style={{backgroundColor:'#D2D2D2'}}>
                          { friendlist.map((element,index)=>{
                            return(
                              <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
                              <div style={{height:'90px',width:'400px',borderRadius:'10px',backgroundColor:'#ffffff'}}>
                                <div style={{display:'flex',alignContent:'center',marginTop:'10px',gap:'10px'}}>
                                  <img style={{height:'70px',width:'70px',borderRadius:'25px',marginLeft:'10px'}} src={element?.profilepic}></img>
                                  <h5  style={{marginTop:'35px',marginLeft:'20px'}}>{element.username}</h5>
                                  <div style={{position:'absolute',right:100}}>
                                    <button style={{height:'40px',width:'100px',borderRadius:'5px',backgroundColor:'#29A3FF',marginTop:'15px'}}  onClick={()=>{unfollowfriend(element.mobile,element.username)}}><h5 style={{marginTop:'3px',fontFamily:'cursive'}}>UnFollow</h5></button>
                                  </div>
                                  
                                </div>
  
                              </div>
  
                            </div>
                            )
                          })}
                          
                          </div>
                          <div className="modal-footer">

                            <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                    
                      </div>
                    </div>
                 
    

     {/* <!-- Trigger the modal with a button --> */}
                    {/* <!-- Modal --> */}
                    <div id="myModal" className="modal fade" role="dialog">
                      <div className="modal-dialog">
                    
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Comment</h4>
                          </div>
                          <div className="modal-body "style={{backgroundColor:'#D2D2D2'}}>
                          <input className='inputreg'  placeholder='Enter comments' minLength={3} type='text' style={{marginLeft:'20px'}} onChange={(e)=>{setpostcomment(e.target.value)}}></input>
                          </div>
                          <div className="modal-footer">
                            <button className="loginbut" onClick={()=>{commentfun()}} >Submit</button>
                            <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                    
                      </div>
                    </div>



                     {/* <!-- Trigger the modal with a button --> */}
                    {/* <!-- Modal --> */}
                    <div id="myModal1" className="modal fade" role="dialog">
                      <div className="modal-dialog">
                    
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Comment</h4>
                          </div>
                          <div className="modal-body "style={{backgroundColor:'#D2D2D2'}}>
                          <input className='inputreg'  placeholder='Enter comments' minLength={3} type='text' style={{marginLeft:'20px'}} onChange={(e)=>{setpostcomment(e.target.value)}}></input>
                          </div>
                          <div className="modal-footer">
                            <button className="loginbut" onClick={()=>{commentfun1()}} >Submit</button>
                            <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                    
                      </div>
                    </div>


                     {/* <!-- Trigger the modal with a button --> */}
                    {/* <!-- Modal --> */}
                    <div id="addModal" className="modal fade" role="dialog">
                      <div className="modal-dialog">
                    
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            <h4 className="modal-title" >Add Post</h4>
                          </div>
                          <div className="modal-body "style={{backgroundColor:'#D2D2D2'}}>
                          <input className='inputreg'  placeholder='Enter post photo as google Link'  type='text' style={{marginLeft:'20px'}} onChange={(e)=>{setpostpic(e.target.value)}}></input>
                          </div>
                          <div className="modal-body" style={{backgroundColor:'#D2D2D2'}}>
                          <input className='inputreg'  placeholder='Enter post bio' minLength={3} type='text' style={{marginLeft:'20px'}}  onChange={(e)=>{setpostbio(e.target.value)}}></input>
                          <span style={{justifyContent:'center',display:'flex',fontSize:'16px',color:'red',marginTop:'12px'}}>{error}</span> 
                           </div>
                          <div className="modal-footer">
                            <button className="loginbut" onClick={Addpostfun} >Submit</button>
                            <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                    
                      </div>
                    </div>


</div>

  
     
 

    </div>
  );
}

export default Post;
