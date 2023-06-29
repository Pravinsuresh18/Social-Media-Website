// import logo from './logo.svg';
// import logo from './logo.png'
import './App.css';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Register from './screens/Register';
import Signin from './screens/signin';
import Home from './screens/home';
import Post from './screens/post';
import Header from './screens/HomeScreen';
// import Profile from './screens/profile';

 const App=()=>{
  return (

    <Router>
      <Routes>
      <Route path="/" element={<Register/>}></Route>
      <Route path="/Signin" element={<Signin/>}></Route>
      <Route path="/Home" element={<Home/>}></Route>
      <Route path="/Post" element={<Post/>}></Route> 
      <Route path="/header" element={<Header/>}></Route> 

      {/* <Route path="/Profile" element={<Profile/>}></Route> */}
        
      </Routes>
    </Router>
  );
}

export default App;
