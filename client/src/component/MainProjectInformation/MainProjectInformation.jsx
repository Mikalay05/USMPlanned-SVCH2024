import "./MainProjectInformation.css";

import CustomerSlider from "../CustomerSlider/CustomerSlider";
import ShowPathInUSM from "../ShowPathInUSM/ShowPathInUSM";
import CardForCustomers from "../CardForCustomers/CardForCustomers";
import ProjectDetails from "../ProjectDetails/ProjectDetails";

export default function MainProjectInformation({ projectData }) {
  //TODO заголовок
  //TODO Детализация по проекту
  return (
    <>
      <TitleForProjectInformation/>
      <CustomerSlider
      notFoundMessage="Not found Customers in this project"
      >
        {projectData.dataForSelect.map((item) => (
          <CardForCustomers
            key={item.customerId} // Обязательно указываем уникальный key
            customerId={item.customerId}
            customerName={item.customerName}
          />
        ))}
      </CustomerSlider>
      <ProjectDetails projectData={projectData} />
    </>
  );
}
