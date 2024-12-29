import "./MainProjectInformation.css";

import CustomerSlider from "../CustomerSlider/CustomerSlider";
import ShowPathInUSM from "../ShowPathInUSM/ShowPathInUSM";
import CardForCustomers from "../CardForCustomers/CardForCustomers";

export default function MainProjectInformation({ projectData }) {
  //TODO заголовок
  //TODO Детализация по проекту
  return (
    <>
      <CustomerSlider>
      {projectData.dataForSelect.length > 0 ? (
        projectData.dataForSelect.map((item, ) => (
          <CardForCustomers customerId={item.customerId} customerName={item.customerName}></CardForCustomers> // Можно использовать любой нужный элемент из item
        ))
      ) : (
        <p>Customer not found</p>
      )}
      </CustomerSlider>
       

    </>
  );
}
