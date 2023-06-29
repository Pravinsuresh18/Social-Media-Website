import React from 'react'
import posta from "../addpost.png";
import pimage from "../p1.png";
import home from "../home.png";
import post from "../post1.png";
import settings from "../findf.png";
import friends from "../friendl.png";
// import msg from "../message.png";
import logout from "../logout.png";
import mainimage from "../postlogo.png"
function Header() {
  return (
    <>
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
    </>
  )
}

export default Header