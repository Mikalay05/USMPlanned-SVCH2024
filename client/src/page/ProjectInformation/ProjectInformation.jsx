import "./ProjectInformation.css";

import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';



import { useState, useEffect } from 'react';

export default function ProjectInformation() {
    const project = {
        id: 0,
        name: "ProjectName"
    };

    const customers = [
        { id: 1, name: 'Common user' },
        { id: 2, name: 'Developer' },
        { id: 3, name: 'Team lead' },
        { id: 4, name: 'Admin' }
    ];

    const epics = [
        { id: 1, name: 'Epic 1' },
        { id: 2, name: 'Epic 2' },
        { id: 3, name: 'Epic 3' }
    ];

    const stories = [
        { id: 1, name: 'Story 1' },
        { id: 2, name: 'Story 2' },
        { id: 3, name: 'Story 3' }
    ];

    const tasks = [
        { id: 1, name: 'Task 1', taskStatusId: 0, taskStatusName: "В ожидании" },
        { id: 2, name: 'Task 2', taskStatusId: 1, deadline: "28.12.2024", taskStatusName: "В процессе" },
        { id: 3, name: 'Task 3', taskStatusId: 2, taskStatusName: "Готов" }
    ];

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedEpic, setSelectedEpic] = useState(null);
    const [selectedStory, setSelectedStory] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    // Эффект для синхронизации состояния с параметрами URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const customerId = params.get('customerId');
        const epicId = params.get('epicId');
        const storyId = params.get('storyId');
        const taskId = params.get('taskId');

        if (customerId) {
            const customer = customers.find(c => c.id === parseInt(customerId));
            if (customer) setSelectedCustomer(customer);
        }
        if (epicId) {
            const epic = epics.find(e => e.id === parseInt(epicId));
            if (epic) setSelectedEpic(epic);
        }
        if (storyId) {
            const story = stories.find(s => s.id === parseInt(storyId));
            if (story) setSelectedStory(story);
        }
        if (taskId) {
            const task = tasks.find(t => t.id === parseInt(taskId));
            if (task) setSelectedTask(task);
        }
    }, []);

    // Обновление URL при изменении состояния
    useEffect(() => {
        const updateUrlParams = () => {
            const params = new URLSearchParams();
            if (selectedCustomer) params.set('customerId', selectedCustomer.id);
            if (selectedEpic) params.set('epicId', selectedEpic.id);
            if (selectedStory) params.set('storyId', selectedStory.id);
            if (selectedTask) params.set('taskId', selectedTask.id);
            window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        };
        updateUrlParams();
    }, [selectedCustomer, selectedEpic, selectedStory, selectedTask]);

    return (
        <>
            <div className="closeIcon"></div>
            <Header />

            <Footer />
        </>
    );
}