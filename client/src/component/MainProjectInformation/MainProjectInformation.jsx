import "./MainProjectInformation.css";

import CustomerSlider from "../CustomerSlider/CustomerSlider";
import CardForCustomers from "../CardForCustomers/CardForCustomers";
import TitleForProjectInformation from "../TitleForProjectInformation/TitleForProjectInformation";
import ProjectDetails from "../ProjectDetails/ProjectDetails";

export default function MainProjectInformation({ projectData }) {
  return (
    <>
      <TitleForProjectInformation projectData={projectData}/>
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
