import React, { useState } from 'react'
import mainimage from "../postlogo.png"
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate=useNavigate()
  const[mob,setmob]=useState('')
  const[pas,setpas]=useState('')
  const[mob1,setmob1]=useState('')
  const[pas1,setpas1]=useState('')
  const[error,seterror]=useState('')


   const loginfun=()=>{
    
         
      let verifyn = /^0|[1-9]\d*$/
      let verifyp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      let count=0
      
      

      if(mob1 === mob && pas1 === pas){
       seterror('**Change the error**')
      }else{
       setmob1(mob)
       setpas1(pas)
          if(mob.length == 10 && verifyn.test(mob)){
             count++
           }else{
              seterror('**Mobile length should be 10**')
           }
           if(pas.length > 6 && verifyp.test(pas)){
             count++
           }else{
              seterror('**Password length should be greater than 6**')
           }
           if(count ==2){
            alert(mob.length)
             const requestOptions = {
               method: 'POST',
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify({mobile:mob,password:pas}),
               redirect: 'follow'
             };
             fetch('http://localhost:6222/logindb', requestOptions)
             .then(response => response.json())
              .then(result => {
               if( result.sucess === "sucess"){
                 navigate("/Home",{state:mob})
               }else{
                seterror(result.error)
               }
            })
             .catch(error => console.log('error', error));
                count=0
            } 
                
                
           } 
         } 
   

  return (
    <section style={{height:'100vh',minHeight:'550px',width:'100%',backgroundColor:'#EFEFEF',display:'flex',alignItems:'center',widows:''}}>
        <div style={{justifyContent:'center',alignItems:'center',display:'flex',width:'100%',height:'100%',gap:'10%'}}>
             <div className='d-lg-flex d-none'>
               <img style={{height:'120%',width:'120%'}} src={mainimage} alt="Logo" />
             </div>
             <div style={{height:"500px",width:"450px",background:"#D4D4D4",borderRadius:10,justifyContent:'center',boxshadow: 'rgba(121, 127, 213, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'}}>
                <div style={{fontSize:'50px',fontFamily:'initial',marginTop:'15px',fontWeight:100,textAlign:'center',color:'#02119E',marginBottom:'2px'}}>
                    Login
                </div>
                <div className='inputdiv' >
                  <input className='inputreg'  placeholder='Enter Mobile Number' maxLength={10} type='numeric' onChange={(e)=>{setmob(e.target.value)}}></input>
                </div>
                <div className='inputdiv' >
                  <input className='inputreg' placeholder='Enter Password' maxLength={10} type='Password' onChange={(e)=>{setpas(e.target.value)}}></input>
                </div>
                <div style={{fontSize:'15px',marginLeft:'45px',marginTop:'10px'}}>
                  <button className="button-59" >Forgotten password?</button>
                  <span style={{justifyContent:'center',display:'flex',fontSize:'13px',color:'red'}}>{error}</span>
                </div>
                <div style={{justifyContent:'center',display:'flex',marginTop:'10px'}}>
                  <button onClick={()=>{loginfun()}} className="loginbut" >Login</button>
                </div>
                <div style={{margin:'10px',marginTop:'10px'}}>
                  <hr style={{top:'20px',height:'2px',background:'#707070'}}></hr>
                </div>
                <div style={{justifyContent:'center',display:'flex',fontSize:'17px'}}>
                Don't have an account?
                </div>
                <div className='inputdiv'>
                   <Link className="signbut" to={'/Signin'}>Sign In</Link>
                </div>
                
                 
              </div>
        </div>
        

    </section>
  )
}

export default Register