import "./ProjectInformation.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Импортируем useParams
import { getProjectById } from '../../store/slices/projectSlice';

import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";

export default function ProjectInformation() {
    const { projectId } = useParams(); // Получаем projectId из URL
    const dispatch = useDispatch();

    // Локальное состояние для хранения данных проекта
    const [projectData, setProjectData] = useState(null);

    // Данные из Redux
    const selectedProject = useSelector((state) => state.project.selectedProject);
    const isLoading = useSelector((state) => state.project.isLoading);

    // Загружаем проект при изменении projectId
    useEffect(() => {
        console.log(projectId)
        if (projectId) {
            dispatch(getProjectById(projectId));
        }
    }, [dispatch, projectId]);

    // Обновляем локальное состояние, когда данные из Redux обновляются
    useEffect(() => {
        if (selectedProject) {
            setProjectData(selectedProject);
        }
    }, [selectedProject]);

    if (isLoading) {
        return <p>Загрузка...</p>; // Отображаем сообщение о загрузке
    }

    if (!projectData) {
        return <p>Проект не найден</p>; // Отображаем сообщение, если данных нет
    }

    return (
        <>
            <div className="closeIcon"></div>
            <Header />
            <div className="project-information">
                <h1>Информация о проекте</h1>
                <p><strong>ID:</strong> {projectData.id}</p>
                <p><strong>Название:</strong> {projectData.name}</p>
                <p><strong>Описание:</strong> {projectData.description}</p>
                {/* Добавьте другие поля проекта по необходимости */}
            </div>
            <Footer />
        </>
    );
}
