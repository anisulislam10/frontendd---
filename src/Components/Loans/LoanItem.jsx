import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { trash } from '../../utils/Icons';

function LoanItem({
  id,
  lenderBorrower,
  amount,
  interestRate,
  repaymentDate,
  status,
  description,
  type,
  indicatorColor,
  deleteItem,
}) {
  return (
    <LoanItemStyled indicator={indicatorColor}>
      <div className="content">
        <h5>{lenderBorrower}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              <strong>Amount:</strong> ${amount}
            </p>
            <p>
              <strong>Interest Rate:</strong> {interestRate}%
            </p>
            <p>
              <strong>Repayment Date:</strong> {dateFormat(repaymentDate)}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Type:</strong> {type === 'taken' ? 'Loan Taken' : 'Loan Given'}
            </p>
            <p>
              <strong>Description:</strong> {description || 'N/A'}
            </p>
          </div>
          <div className="btn-container">
            <button
              className="delete-btn"
              onClick={() => deleteItem(id)}
              title="Delete Loan"
            >
              {trash}
            </button>
          </div>
        </div>
      </div>
    </LoanItemStyled>
  );
}

const LoanItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }
    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        p {
          margin: 0;
          font-size: 1rem;
        }
      }
      .btn-container {
        display: flex;
        align-items: center;
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
  }
`;

export default LoanItem;