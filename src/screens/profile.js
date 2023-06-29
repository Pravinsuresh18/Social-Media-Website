import React from 'react'
import mainimage from "../postlogo.png"

function Profile() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg py-3  navbar-dark bg-primary" >

    <div className="container-fluid justify-content-around" >
        <div>
        <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
        </div>
    <div>
    
      <img alt='' height={73.5} width={130} src={mainimage} />
    </div>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <form style={{ width: '50%', minWidth: '300px' }} className="d-flex d-none d-lg-flex ">
      <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn bg-white" type="submit">Search</button>
    </form>



    <div className=" gap-5 justify-content-center align-items-center d-none d-lg-flex">
      <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}><i style={{ fontSize: "23px", color: 'white' }} className="fa">&#xf07a; Cart</i> </button>
      <button className='text-primary btn bg-white'>Login</button>
      <button className='btnacc'><i style={{ fontSize: "3vw", color: 'white' }} className='fas'>&#xf2bd;</i></button>

    </div>


  </div>
        </nav>
 <nav
 id="sidebarMenu"
 className="collapse d-lg-block sidebar collapse bg-white"
>
 <div className="position-sticky">
   <div className="list-group list-group-flush mx-3 mt-4">
     {/* <!-- Collapse 1 --> */}
     <a
       className="list-group-item list-group-item-action py-2 ripple"
       aria-current="true"
       data-mdb-toggle="collapse"
       href="#collapseExample1"
       aria-expanded="true"
       aria-controls="collapseExample1"
     >
       <i className="fas fa-tachometer-alt fa-fw me-3"></i>
       <span>Expanded menu</span>
     </a>
     {/* <!-- Collapsed content --> */}
     <ul
       id="collapseExample1"
       className="collapse show list-group list-group-flush"
     >
       <li className="list-group-item py-1">
         <button className="text-reset">Link</button>
       </li>
       <li className="list-group-item py-1">
         <button className="text-reset">Link</button>
       </li>
     </ul>
     {/* <!-- Collapse 1 --> */}

     {/* <!-- Collapse 2 --> */}
     <a
       className="list-group-item list-group-item-action py-2 ripple"
       aria-current="true"
       data-mdb-toggle="collapse"
       href="#collapseExample2"
       aria-expanded="true"
       aria-controls="collapseExample2"
     >
       <i className="fas fa-chart-area fa-fw me-3"></i>
       <span>Collapsed menu</span>
     </a>
     {/* <!-- Collapsed content --> */}
     <ul
       id="collapseExample2"
       className="collapse list-group list-group-flush"
     >
       <li className="list-group-item py-1">
         <button className="text-reset">Link</button>
       </li>
       <li className="list-group-item py-1">
         <button className="text-reset">Link</button>
       </li>
     </ul>
     {/* <!-- Collapse 2 --> */}
   </div>
 </div>
</nav>
</div>
  )
}

export default Profile