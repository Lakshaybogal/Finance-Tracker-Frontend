import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './pages.css'
import axios from 'axios';
import AppContext from '../Context/AppContext';
const Register = () => {
  localStorage.clear();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: '',
  });
  const [error, setError] = useState(' ');
  const { userLogin } = useContext(AppContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      return setError('Complete all fields');
    }
    if(user.password !== user.cPassword)
    {
      return setError('Passwords do not match');
    }
    await axios.post(import.meta.env.VITE_API_LINK + "newuser", user).then(res => {
      userLogin({
        _id: res.data._id,
        email: res.data.email,
      })
      navigate('/home',)
    })
      .catch(err => {
        console.log(err);
        setError(err.response.data.Error);
      })
  }
  const handleChange = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;
  
    setUser((prev) => {
      return {
        ...prev, [name]: value
      }

    })
    
  }

  return (
    <section>
      <p className='headerName'><span>Finance Tracker</span></p>
      <div className="loginPage">
        <fieldset className='inputBorder registerBorder'>
          <p className='error'>{error}</p>
          <div className='registerGreetTxt'>
            <p>Hey, People</p>
            <p><span>Register</span> for Finance Tracker </p>
          </div>

          <div className='flex-col'>
            <label>Name</label>
            <input type="text" name="name" className='loginInput'
              value={user.name} placeholder='Name'
              onChange={handleChange} autoComplete='off' required />
          </div>
          <div className='flex-col'>
            <label>Email</label>
            <input type="email" name="email" className='loginInput'
              value={user.email} placeholder='Email'
              onChange={handleChange} autoComplete='off' required />
          </div>
          <div className='flex-col'>
            <label>Password</label>
            <input type="password" name="password" className='loginInput'
              value={user.password} placeholder='Password'
              onChange={handleChange} required />
          </div>
          <div className='flex-col'>
            <label>Confirm Password</label>
            <input type="password" name="cPassword" className='loginInput'
              value={user.cPassword} placeholder='Confirm Password'
              onChange={handleChange} required />
          </div>
          <button className="submitBtn" type="submit" onClick={handleSubmit}>Continue</button>
        </fieldset>

      </div>
      <div className='bottomInput'>
        <p className='registerTxt'>Already registed?</p>
        <div>
          <button className='registerBtn' onClick={() => { navigate('/') }}>Login</button>
        </div>
      </div>
    </section>
  )
}

export default Register