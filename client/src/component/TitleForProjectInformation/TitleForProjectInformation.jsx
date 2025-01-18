import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TitleForProjectInformation.css';
import CustomerSelect from '../CustomerSelect/CustomerSelect';
import CustomerButton from '../CustomerButton/CustomerButton';
import { useDispatch, useSelector } from "react-redux";

export default function TitleForProjectInformation({
    filterKey = 'customerName',
}) {
    const navigate = useNavigate(); // Хук для навигации

    const dispatch = useDispatch();

    // Получаем selectedProject и isLoading из Redux
    const selectedProject = useSelector((state) => state.project.selectedProject);
    const isLoading = useSelector((state) => state.project.isLoading);

    // Функция для обработки выбора элемента
    const handleSelectItem = (selectedItem) => {
        if (selectedItem && selectedItem.customerId) {
            // Перенаправление на нужную страницу с customerId
            navigate(`/information/${selectedProject.projectId}/${selectedItem.customerId}`);
        }
    };

    // Если проект еще загружается или не найден
    if (isLoading || !selectedProject) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-TitleForProjectInformation">
          <h1>{selectedProject?.projectName || 'Project Name Not Available'}</h1>
          <h3>{selectedProject?.status?.status_name || 'Status Not Available'}</h3>
          <div className="selected-in-TitleForProjectInformation">
            <CustomerSelect
              options={selectedProject?.dataForSelect || []}
              filterKey={filterKey}
              onSelectItem={handleSelectItem}
            />
          </div>
          <CustomerButton textValue="Export USM" />
        </div>
    );
}
