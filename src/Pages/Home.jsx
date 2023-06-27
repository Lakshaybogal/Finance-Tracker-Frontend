
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { FaPlus, FaMinus } from 'react-icons/fa'
import logo from '../assets/react.svg'
import './pages.css'
import AppContext from "../Context/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const state = useContext(AppContext)

  var id = state.user._id;
  var email = state.user.email;
  if (!id || !email) {
    id = JSON.parse(localStorage.getItem('id'))
    email = JSON.parse(localStorage.getItem('email'));
  }


  const [transaction, setTransactions] = useState([]);
  const [user, setUser] = useState({
    name: '',
    email: '',
    balance: 0,
    spend: 0,
    earn: 0,
  });

  const getTransactions = async () => {
    if (id) {
      const res = await axios.get(import.meta.env.VITE_API_LINK +'transactions/' + id);
      setTransactions(res.data);
    }

  }
  const getUser = async () => {
    if (id) {
      const res = await axios.get(import.meta.env.VITE_API_LINK  + 'user/' + id);
      setUser(res.data);
    }

  }

  useEffect(() => {
    getTransactions();
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('email', JSON.stringify(email));
  }, [email, id])

  const earn = () => {
    navigate('/earn');
  }
  const spend = () => {
    navigate('/spend');
  }
  return (
    <div>
      <nav className=" flex-row flex-gap-1 navBar">
        <img src={logo} alt="" /> <div><h5>{user.name}</h5><h6>{user.email}</h6></div>
        <h6 onClick={()=>navigate('/')}>logout</h6>
      </nav>
      <div className="balanceMain">
        <div className="balanceBox">
          <h2>{user.balance}</h2>
          <div className="semiBalanceBox">
            <div><h4>Earn</h4><h3>{user.earn}</h3></div>
            <div><h4>Spend</h4><h3>{user.spend}</h3></div>
          </div>
        </div>
        <div className="earnSpendBtns">
          <button onClick={earn}><FaPlus />Earn</button>
          <button onClick={spend}><FaMinus />Spend</button>
        </div>
      </div>
      <div className="transactions">
        <div className="transactionsHeading">
          <h4>Transactions</h4><p>view more</p>
        </div>

        {
          transaction.reverse().slice(0, 10).map(res => {
            const { _id, transactionAmt, transactionName } = res;
            return <div className="transaction" key={_id}>
              <p>{transactionName}</p><p>{transactionAmt}</p>
            </div>
          })
        }
      </div>


    </div>
  )
}

export default Home