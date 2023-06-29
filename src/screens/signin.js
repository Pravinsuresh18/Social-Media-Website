import React, { useState } from 'react'
import mainimage from "../postlogo.png"
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'

function Signin() {
  const navigate=useNavigate()
  
    const [bool,setBool]=useState({reg1:true,reg2:false})
    const[firstname,setfirstname]=useState('')
    const[secname,setsecname]=useState('')
    const[mob,setmob]=useState('')
    const[pas,setpas]=useState('')  
    const[gender,setgender]=useState('') 
    const[dob,setdob]=useState('')  
    const[profile,setprofile]=useState('') 
    const[cover,setcover]=useState('') 
    const[bio,setbio]=useState('')
    const[agree,setagree]=useState('') 
    const[error,seterror]=useState('')

    const onNativeChange = e => {
      console.log("onNativeChange: ", e.target.value);
      setdob(e.target.value);
    };

    const nextfun=async()=>{
      seterror('')
      let count=0
      let verify = /^[a-zA-Z]*$/
      let verifyn = /^0|[1-9]\d*$/
      let verifyp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      if(firstname.length >= 3 && verify.test(firstname)){
        count++
     }else{
        seterror('*firstname length should be greater than 3 and name must be alphabetes')
     }
     if(secname.length >= 1 && verify.test(secname)){
      count++
     }else{
      seterror('*lastname length should be greater than 3 and name must be alphabetes')
     }
     if(mob.length === 10 && verifyn.test(mob)){
        count++
     }else{
        seterror('*Mobile length should be 10')
     }
     if(pas.length > 6 && verifyp.test(pas)){
        count++
     }else{
        seterror('*Password length should be greater than 6')
     }
     if(gender !== ''){
      count++
     }else{
        seterror('*gerder is mandatory')
     }
     if(dob !== ''){
      count++
     }else{
        seterror('*date of birth is mandatory')
     }
     if(count === 6){
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({mobile:mob}),
        redirect: 'follow'
      };
     await fetch('http://localhost:6222/mobilecheckdb', requestOptions)
      .then(response => response.json())
       .then(result => {
        if( result.sucess === 'sucess'){
          setBool({reg1:false,reg2:true})
        }else{
          seterror(result.error)
        }
        
         
  
     })
      .catch(error => console.log('error', error));
      count=0
     }else{
      count=0
     }
     
    }
    const submitfun=async()=>{
      // https://i.pinimg.com/originals/f9/cf/85/f9cf8558574e36b52675e9113c11aece.jpg
      seterror('')
      let verifyl=/^(http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/
      console.log('p',profile)
      console.log('c',cover)
      let count=0
      if(verifyl.test(profile)){
        count++
      }else{
        seterror('*Profile photo link should be valid and in http format')
      }
      if(verifyl.test(cover)){
        count++
      }else{
        seterror('* Cover photo link should be valid and in http format')
      }
      if(bio.length >= 3 ){
        count++
      }else{
        seterror('* profile bio length should be greater than 3 ')
      }
      if(agree !== ''){
         count++
      }else{
        seterror('* click terms and conditions')
      }
      if(count === 4){
        console.log(count)
        seterror('')
        let name = firstname+secname
        const requestOptions = {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username:name,mobile:mob,password:pas,gender:gender,birth:dob,profilepic:profile,coverpic:cover,bio:bio}),
          redirect: 'follow'
        };
       await fetch('http://localhost:6222/signdb', requestOptions)
        .then(response => response.json())
         .then(result => {
          if( result.sucess === 'sucess'){
            profilefun()
          }else{
            seterror(result.error)
          }
       })
        .catch(error => console.log('error', error));
          
       
        count=0
      }
      
    }
    const profilefun=async()=>{
      let name = firstname+secname
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username:name,mobile:mob,gender:gender,birth:dob,profilepic:profile,coverpic:cover,bio:bio}),
        redirect: 'follow'
      };
     await fetch('http://localhost:6222/profileinsertdb', requestOptions)
      .then(response => response.json())
       .then(result => {
        if( result.sucess === 'sucess'){
          postfun()
          
        }
        console.log(result.error)
       

     })
      .catch(error => console.log('error', error));
        
    }
    const postfun=async()=>{
      let name = firstname+secname
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username:name,mobile:mob,profilepic:profile}),
        redirect: 'follow'
      };
     await fetch('http://localhost:6222/postinsertdb', requestOptions)
      .then(response => response.json())
       .then(result => {
        if( result.sucess === 'sucess'){
           friendfun()
          
        }
        

     })
      .catch(error => console.log('error', error));
    }

    const friendfun=async()=>{
      let name = firstname +secname
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username:name,mobile:mob}),
        redirect: 'follow'
      };
     await fetch('http://localhost:6222/friendinsertdb', requestOptions)
      .then(response => response.json())
       .then(result => {
        if( result.sucess === 'sucess'){
          
          navigate("/Home",{state:mob})
        }
        console.log(result)
         setfirstname('')
         setsecname('')
         setmob('')
         setpas('')
         setgender('')
         setdob('')
         setprofile('')
         setcover('')
         setbio('')

     })
      .catch(error => console.log('error', error));
    }
    
    
    
  return (
    <div style={{height:'100vh',minHeight:'580px',width:'100%',backgroundColor:'#EFEFEF',display:'flex'}}>
    <div style={{justifyContent:'center',alignItems:'center',display:'flex',width:'100%',gap:'10%'}}>
         <div  className='d-lg-flex d-none'>
           <img style={{height:'120%',width:'120%'}} src={mainimage} alt="Logo" />
         </div>
         
            <div style={{height:"540px",width:"450px",background:"#D4D4D4",borderRadius:10,justifyContent:'center',boxshadow: 'rgba(121, 127, 213, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'}}>
            {
            bool.reg1 && <>
            <div style={{fontSize:'50px',fontFamily:'initial',marginTop:'10px',fontWeight:100,textAlign:'center',color:'#02119E'}}>
                Sign In
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'center',marginTop:'10px'}} >
              <input className='inputreg1'  placeholder='Enter First Name' maxLength={10} type='numeric' onChange={(e)=>{setfirstname(e.target.value)}}></input>
              <input className='inputreg1'  placeholder='Enter Sure Name' maxLength={10} type='numeric' onChange={(e)=>{setsecname(e.target.value)}}></input>
            </div>
            <div className='inputdivs' >
              <input className='inputregs'  placeholder='Enter Mobile Number' maxLength={10} type='numeric' onChange={(e)=>{setmob(e.target.value)}}></input>
            </div>
            <div className='inputdivs' >
              <input className='inputregs' placeholder='Enter Password' maxLength={10} type='Password'onChange={(e)=>{setpas(e.target.value)}}></input>
            </div>
            
            <div style={{display:'flex',fontSize:'15px',marginTop:'15px',marginLeft:'65px',color:'#727272',gap:'5px'}}>
                Gender :
               <label className="form-check">
                <input type="radio" name="gender" checked={ gender ==='male'} onClick={()=>{setgender('male')}} value={'male'}/>
                 male
              </label>
              <label className="form-check">              
                <input type="radio" name="gender" checked={ gender ==='female'} onClick={()=>{setgender('female')}} value={'female'}/>         
                  female              
                </label>
                <label className="form-check">              
                <input type="radio" name="gender" checked={ gender ==='custom'} onClick={()=>{setgender('custom')}} value={'custom'} />         
                  custom              
                </label>
            </div>

            <div style={{display:'flex',fontSize:'15px',marginTop:'15px',marginLeft:'65px',color:'#727272',gap:'5px'}}>
            <label  for="start">Date of Birth:</label>
                <input style={{height:'30px',width:'160px',borderRadius:5,border:'0px'}} type="date" id="start"value={dob} onChange={onNativeChange} 
                
                min="1990-01-01" max="2012-12-31"/>
            </div>
            <span style={{justifyContent:'center',display:'flex',fontSize:'13px',color:'red'}}>{error}</span>
           
            <div style={{justifyContent:'center',display:'flex',marginTop:'15px'}}>
              <button className="loginbut1" onClick={()=>{nextfun()}}  >Next</button>
            </div>

            <div style={{marginLeft:'25px',marginTop:'15px',marginRight:'25px'}}>
              <hr style={{top:'20px',height:'2px',background:'#707070'}}></hr>
            </div>
            <div style={{justifyContent:'center',display:'flex',fontSize:'15px',marginTop:'15px'}}>
            Already have an account?
            </div>
            <div className='inputdivs'>
            <Link className="signbut" to={'/'}>Login</Link>
            </div>
            
            </>
        }
        {
           bool.reg2 && <>
            <div style={{fontSize:'50px',fontFamily:'initial',marginTop:'10px',fontWeight:100,textAlign:'center',color:'#02119E'}}>
                Sign In
            </div>
            <div className='inputdivs' >
              <input className='inputreg'  placeholder='Enter profile photo as google link'  type='text' onChange={(e)=>{setprofile(e.target.value)}}></input>
            </div>
            <div className='inputdivs' >
              <input className='inputreg' placeholder='Enter profile cover photo as google link' type='text'   onChange={(e)=>{setcover(e.target.value)}}></input>
            </div>
            <div className='inputdivs' >
              <input className='inputreg' placeholder='Enter prfile bio' type='text'   onChange={(e)=>{setbio(e.target.value)}}></input>
            </div>
           
            <div style={{fontSize:'12px',marginLeft:'65px',marginRight:'65px',marginTop:'10px'}}>
             <p>By clicking checkbox, you agree to our Terms, Privacy Policy and Cookies Policy.</p> 
            </div>
            <div style={{display:'flex',fontSize:'15px',marginLeft:'40px',color:'#727272',gap:'10px'}}>
              <label className="form-check">
                <input type="checkbox" name="agree" checked={ agree ==='agree'} onClick={()=>{setagree('agree')}} value={'agree'} />
                 agree terms and condition
              </label>
              
            </div>

            <span style={{justifyContent:'center',display:'flex',fontSize:'13px',color:'red'}}>{error}</span>         
            <div style={{justifyContent:'center',display:'flex',marginTop:'15px',gap:'15px'}}>
              {/* <button className="loginbut1" onClick={()=>setBool({reg1:true,reg2:false})} >Previous</button> */}
              <button className="loginbut1" onClick={()=>{submitfun()}}  >Submit</button>
            </div>

            <div style={{marginLeft:'25px',marginTop:'15px',marginRight:'25px'}}>
              <hr style={{top:'20px',height:'2px',background:'#707070'}}></hr>
            </div>
            <div style={{justifyContent:'center',display:'flex',fontSize:'15px',marginTop:'10px'}}>
            Already have an account?
            </div>
            <div className='inputdivs'>
            <Link className="signbut" to={'/'}>Login</Link>
            </div>
           </>  

        }
          </div>
    </div>
    

</div>
  )
}

export default Signin