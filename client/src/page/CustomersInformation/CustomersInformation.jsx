import "./CustomersInformation.css";

import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import CustomerSelect from "../../component/CustomerSelect/CustomerSelect";
import CustomerCard from "../../component/CustomerCard/CustomerCard";
import ShowPathInUSM from "../../component/ShowPathInUSM/ShowPathInUSM";

export default function CustomersInformation() {
    const project = {
        id: 0,
        name: "ProjectName"
    };

    const Customer = [
        { id: 1, name: 'Common user' },
        { id: 2, name: 'Developer' },
        { id: 3, name: 'Team lead' },
        { id: 4, name: 'Admin' }
    ];

    const EpicsExample = [
        { id: 1, name: 'Epic 1' },
        { id: 2, name: 'Epic 2' },
        { id: 3, name: 'Epic 3' }
    ];

    const StoriesExample = [
        { id: 1, name: 'Story 1' },
        { id: 2, name: 'Story 2' },
        { id: 3, name: 'Story 3' }
    ];

    const TasksExample = [
        { id: 1, name: 'Task 1' },
        { id: 2, name: 'Task 2' },
        { id: 3, name: 'Task 3' }
    ];

    return (
        <>
            <Header />
            <h1>{project.name}</h1>
            <CustomerSelect options={Customer} filterKey="name" maxItems={5} placeholderValue="Choose User" />
            <ShowPathInUSM 
                customerData={Customer[1]} 
                epicData={EpicsExample[0]} 
                storyData={StoriesExample[1]} 
                taskData={TasksExample[2]} 
            />
            <Footer />
        </>
    );
}