import React from 'react';
import './CustomerActionsData.css';
import { useSelector } from 'react-redux';
import LoadingDots from '../../LoadingDots/LoadingDots';

// Функция для форматирования даты
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
const CustomerActionsData = () => {
  const { actionsData, isLoading } = useSelector((state) => state.customer.customerActions);
  return (
    <div className="customer-actions-section">
      <h3 className="customer-actions-title">Actions of Customer:</h3>
      <div className="customer-actions-list">
        {isLoading ? (
          <p className="loading-text"><LoadingDots/>Loading actions...</p>
        ) : actionsData?.length > 0 ? (
          actionsData.map((action) => (
            <p key={action.actionId} className="customer-action-item">
              {formatDate(action.created_at)} | {action.user.login} ({action.user.fullName}) DID {action.description}
            </p>
          ))
        ) : (
          <p className="no-actions-found">Action not found</p>
        )}
      </div>
    </div>
  );
};

export default CustomerActionsData;
