import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Users/Register'
import NavBar from './Components/Home/NavBar';
import Items from './Components/Home/Items';
import Item from './Components/Home/Item';
import { Route, Routes, Link } from 'react-router-dom'
import Cart from './Components/Home/Cart';
import Admin from './Components/Admin/Admin';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
      <Route path='/Admin' element={<Admin />} />
      <Route path='/Cart' element={<Cart />} />
        <Route path='/' element={<Items />} />
        <Route path='/Item' element={<Item />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        {/* <Route path='/Todos' element={<Todos/>}/>
      <Route path='/Posts' element={<Posts/>}/> */}
      </Routes>
    </>
  );
}

export default App;
