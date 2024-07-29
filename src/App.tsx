import {  useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/home/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CartPage from './pages/CartPage';
import PageNotFound from './pages/error/PageNotFound';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({
    name:'',
    rollno:''
  })

//   useEffect(()=>{
// fetch('/api').then((res)=>{
//   return res.json()
// }).then((data)=>{
//   setUser({name:data.name,rollno:data.rollno})
// })
//   },[])

 return(<>

<Router>
        <Routes>
        <Route path="/"  element={<Home/>}/>
          <Route path="/login"  element={<Login/>}/>

          <Route path="/homepage" element={<Home/>} />
          <Route  path="/signup"  element={<Register/>} />
          <Route path="/cart"  element={<CartPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/product"  />
          <Route path="/addEmployee"  />
          <Route path="/addproduct"  />
          <Route path="/userOrder"/>
          <Route path="/women"  />
          <Route path="/electronics" />
          <Route path="/accessories"/>
          <Route path="/about"  />
          <Route path="/contact"  />
          <Route path="/policy"  />
          <Route path="/*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
 

 </>)}

 export default App;