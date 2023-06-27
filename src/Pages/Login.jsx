import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './pages.css';
import axios from 'axios';
import AppContext from '../Context/AppContext';
const Login = () => {
    localStorage.clear();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const { userLogin } = useContext(AppContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            return setError('email or password is missing');
        }
        else {
            await axios.post(import.meta.env.VITE_API_LINK + "login", user)
                .then(res => {
                    userLogin({
                        _id: res.data._id,
                        email: res.data.email,
                    })
                    navigate('/home',)
                })
                .catch(err => {
                    setError(err.response.data.Error)
                })
        }

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

                <fieldset className='inputBorder'>
                    <p className='error'>{error}</p>
                    <div className='greetingTxt'>
                        <p>Hey, Good people</p>
                        <p><span>Login</span> to continue</p>

                    </div>

                    <div className='flex-col'>
                        <label>Email</label>
                        <input type="email" name="email" className='loginInput'
                            value={user.email} placeholder='email'
                            onChange={handleChange} autoComplete='off' required />
                    </div>
                    <div className='flex-col'>
                        <label>Password</label>
                        <input type="password" name="password" className='loginInput'
                            value={user.password} placeholder='password'
                            onChange={handleChange} autoComplete='off' required />
                    </div>
                    <button className="submitBtn" type="submit" onClick={handleSubmit}>Continue</button>
                </fieldset>

            </div>
            <div className='bottomInput'>
                <p className='registerTxt'>Not registed?</p>
                <div>
                    <button className='registerBtn' onClick={() => { navigate('/register') }}>Register </button>
                </div>
            </div>
        </section>
    )
}

export default Login