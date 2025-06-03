import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import LoanForm from './LoanForm';
import { trash } from '../../utils/Icons';
export const dateFormat = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
function Loans() {
  const { loans, getLoans, deleteLoan, totalLoans, loading, error } = useGlobalContext();

  useEffect(() => {
    getLoans();
  }, []);

  return (
    <LoansStyled>
      <InnerLayout>
        <h1>Loans</h1>
        <h2 className="total-loans">
          Total Loans: <span>${totalLoans()}</span>
        </h2>
        {error && <p className="error">{error}</p>}
        <div className="loans-content">
          <div className="form-container">
            <LoanForm />
          </div>
          <div className="loans-table">
            {loading ? (
              <p>Loading loans...</p>
            ) : loans?.length === 0 ? (
              <p>No loans found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Repayment Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loans?.map((loan) => {
                    const {
                      _id,
                      lenderBorrower,
                      amount,
                      repaymentDate,
                      status,
                    } = loan;
                    return (
                      <tr key={_id}>
                        <td>{lenderBorrower}</td>
                        <td>{status.charAt(0).toUpperCase() + status.slice(1)}</td>
                        <td>${Number(amount).toFixed(2)}</td>
                        <td>{dateFormat(repaymentDate)}</td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => deleteLoan(_id)}
                            title="Delete Loan"
                          >
                            {trash}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </InnerLayout>
    </LoansStyled>
  );
}

const LoansStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-loans {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0faff;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-blue);
    }
  }
  .error {
    color: #ff4444;
    text-align: center;
    margin: 1rem 0;
  }
  .loans-content {
    display: flex;
    gap: 2rem;
    .loans-table {
      flex: 1;
      table {
        width: 100%;
        border-collapse: collapse;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        overflow: hidden;
      }
      th, td {
        padding: 0.8rem;
        text-align: left;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      th {
        background: #f0faff;
        font-weight: 600;
        color: #222260;
      }
      td {
        color: #222260;
      }
      .delete-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        color: #ff4444;
        &:hover {
          color: #cc0000;
        }
      }
    }
  }
`;

export default Loans;