import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TitleForProjectInformation.css';
import CustomerSelect from '../CustomerSelect/CustomerSelect';
import CustomerButton from '../CustomerButton/CustomerButton';

export default function TitleForProjectInformation({
    projectData,
    filterKey = 'customerName',
    onSelectItem,
}) {
    const navigate = useNavigate(); // Хук для навигации

    // Функция для обработки выбора элемента
    const handleSelectItem = (selectedItem) => {
        if (selectedItem && selectedItem.customerId) {
            // Перенаправление на нужную страницу с customerId
            navigate(`/information/${projectData.projectId}/${selectedItem.customerId}`);
        }
    };

    return (
        <div className="container-TitleForProjectInformation">
          <h1>{projectData?.projectName || 'Project Name Not Available'}</h1>
          <h3>{projectData?.status?.status_name || 'Status Not Available'}</h3>
          <div className="selected-in-TitleForProjectInformation">
            <CustomerSelect
              options={projectData?.dataForSelect || []}
              filterKey={filterKey}
              onSelectItem={handleSelectItem}
            />
          </div>
          <CustomerButton textValue="Export USM" />
        </div>
      );
      
}
