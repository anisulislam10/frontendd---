import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "https://backend-tawny-six-87.vercel.app/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
  const [loans, setLoans] = useState([]);
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }
   const addLoan = async (loan) => {
    try {
      const response = await axios.post(`${BASE_URL}add-loan`, loan);
      setLoans([response.data, ...loans]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add loan');
    }
  };





  const getLoans = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-loans`);
      setLoans(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch loans');
    }
  };

  const deleteLoan = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-loan/${id}`);
      setLoans(loans.filter((loan) => loan._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete loan');
    }
  };

   const totalLoans = () => {
    return loans.length > 0
      ? loans
          .reduce((total, loan) => total + (Number(loan.amount) || 0), 0)
          .toFixed(2)
      : '0.00'; // Return '0.00' if loans array is empty
  };

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            deleteLoan,
            getLoans ,
            totalBalance,
            totalLoans,
            transactionHistory,
            error,
            addLoan,
            loans,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}