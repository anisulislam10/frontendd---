import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function LoanForm() {
  const { addLoan, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    lenderBorrower: '',
    amount: '',
    interestRate: '',
    repaymentDate: '',
    status: 'active',
    description: '',
  });

  const { lenderBorrower, amount, interestRate, repaymentDate, status, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLoan(inputState);
    setInputState({
      lenderBorrower: '',
      amount: '',
      interestRate: '',
      repaymentDate: '',
      status: 'active',
      description: '',
    });
  };

  return (
    <LoanFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={lenderBorrower}
          name="lenderBorrower"
          placeholder="Lender/Borrower Name"
          onChange={handleInput('lenderBorrower')}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={amount}
          name="amount"
          placeholder="Loan Amount"
          onChange={handleInput('amount')}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={interestRate}
          name="interestRate"
          placeholder="Interest Rate (%)"
          onChange={handleInput('interestRate')}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="repaymentDate"
          placeholderText="Select Repayment Date"
          selected={repaymentDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setInputState({ ...inputState, repaymentDate: date })}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={status}
          name="status"
          id="status"
          onChange={handleInput('status')}
        >
          <option value="active">Active</option>
          <option value="repaid">Repaid</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput('description')}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name="Add Loan"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="var(--color-accent)"
          color="#fff"
        />
      </div>
    </LoanFormStyled>
  );
}

const LoanFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input,
    select {
      width: 100%;
    }
  }
  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }
  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default LoanForm;