
import axios from "axios";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { BiLeftArrow } from 'react-icons/bi'
import './pages.css'
const Spend = () => {

  const navigate = useNavigate();
  const [transactions, setTransactions] = useState({
    transactionName: '',
    transactionAmt: ''
  });

  const [error, setError] = useState('');
  const state = useContext(AppContext);

  let email = state.user.email;
  if (!email) {
    email = JSON.parse(localStorage.getItem('email'));
  }

  const addTransaction = async (e) => {
    e.preventDefault();
    if (transactions.transactionAmt === '' || transactions.transactionName === '') {
      return setError('missing');
    }
    await axios
      .patch(import.meta.env.VITE_API_LINK + "spend",
        {
          email: email,
          transactions: [{
            transactionName: transactions.transactionName,
            transactionAmt: transactions.transactionAmt
          }]
        })
      .then(() => {
        setTransactions({
          transactionName: '',
          transactionAmt: '',
        })
      })
      .catch(err => {
        console.log(err);
        setError(err);
      })
  }

  const handleChnage = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTransactions((prev) => {
      return {
        ...prev, [name]: value
      }
    }
    )
  }


  return (
    <>
      <section className="Spend">
        <h6 onClick={() => { navigate('/home') }}
          className="backButton"><BiLeftArrow />
          back
        </h6>
        <div>
          {
            error === "missing" ?
              <p className="error">
                Please enter an amount or transcation name
              </p> : <p className="noError"></p>
          }
        </div>
        <h3>Spend</h3>
        <div className="inputField">
          <input type="number" name="transactionAmt"
            className="Tamt"
            value={transactions.transactionAmt} placeholder="0"
            onChange={handleChnage} />
          <input type="text" name="transactionName"
            className="Tname"
            value={transactions.transactionName} autoComplete="off" placeholder="Transaction"
            onChange={handleChnage} />
        </div>
        <button className="transactionButton"
          onClick={addTransaction}>
          Add {transactions.transactionAmt}
        </button>
      </section>
    </>
  )
}
export default Spend