import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TitleForProjectInformation.css';
import CustomerSelect from '../CustomerSelect/CustomerSelect';
import CustomerButton from '../CustomerButton/CustomerButton';
import { useDispatch, useSelector } from "react-redux";
import LoadingDots from '../LoadingDots/LoadingDots';

export default function TitleForProjectInformation({
    filterKey = 'name',
}) {
    const navigate = useNavigate(); // Хук для навигации

    const dispatch = useDispatch();

    // Получаем selectedProject и isLoading из Redux
    const {projectData,isLoading} = useSelector((state) => state.project.currentProject);
    const selectedProject = useSelector(
      (state) => state.project.customersForSelectInTheProject
    );
    // Функция для обработки выбора элемента
    const handleSelectItem = (selectedItem) => {
        if (selectedItem && selectedItem.id) {
            // Перенаправление на нужную страницу с customerId
            navigate(`/information/${projectData.projectId}/${selectedItem.id}`);
        }
    };

    // Если проект еще загружается или не найден
    if (isLoading) {
        return <div>Loading...<LoadingDots/></div>;
    }

    return (
        <div className="container-TitleForProjectInformation">
          <h1>{projectData?.projectName || 'Project Name Not Available'}</h1>
          <h3>{projectData?.status?.status_name || 'Status Not Available'}</h3>
          <div className="selected-in-TitleForProjectInformation">
            <CustomerSelect
              options={selectedProject?.customersData || []}
              filterKey={filterKey}
              onSelectItem={handleSelectItem}
            />
          </div>
          <CustomerButton textValue="Export USM" />
          <CustomerButton textValue="Get Gantt chart" />
        </div>
    );
}
