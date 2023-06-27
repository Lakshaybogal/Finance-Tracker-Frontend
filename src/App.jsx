import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Earn from './Pages/Earn';
import Spend from './Pages/Spend';

function App() {

  return (
      <div>
        <Router>
          <Routes>
            <Route path='/' element ={<Login/>}/>
            <Route path='/home' element ={<Home/>}/>
            <Route path='/register' element ={<Register/>}/>
            <Route path='/earn' element ={<Earn/>}/>
            <Route path='/spend' element ={<Spend/>}/>
          </Routes>
        </Router>
      </div>
  )
}

export default App
