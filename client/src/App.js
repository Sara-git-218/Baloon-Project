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
import AdminItems from './Components/Admin/AdminItem';
import AddItem from './Components/Admin/AddItem'
import Orders from './Components/Admin/Orders';
import UpdateItem from './Components/Admin/UpdateItem';
import ContactForm from './Components/Users/Contact';
import Footer from './Components/Home/Footer';

function App() {
  return (
    <>
      <NavBar />
      <main>
      <div className="main-content">
      <Routes>
        <Route path='/Contact' element={<ContactForm />} />
        <Route path='/Admin/Items/UpdateItem' element={<UpdateItem />} />
        <Route path='/Admin/Items' element={<AdminItems />} />
        <Route path='/Admin/AddItem' element={<AddItem />} />
        <Route path='/Admin/Orders' element={<Orders />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/' element={<Items />} />
        <Route path='/Item' element={<Item />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Admin' element={<Admin />} />

      </Routes>
      </div>
      </main>
      <Footer/>
    </>
  );
}

export default App;
