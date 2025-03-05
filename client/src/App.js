import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import NavBar from './Components/Home/NavBar';
import Items from './Components/Home/Items';
import Item from './Components/Home/Item';
import {Route,Routes,Link} from'react-router-dom'

function App() {
  return (
    <> 
    <NavBar/>
     {/* <Login/> */}
     {/* <Item/> */} 
     <Routes>
     <Route path='/' element={<Items/>}/>
      <Route path='/Item' element={<Item/>}/>
      {/* <Route path='/Todos' element={<Todos/>}/>
      <Route path='/Posts' element={<Posts/>}/> */}
    </Routes>
    </>
  );
}

export default App;
