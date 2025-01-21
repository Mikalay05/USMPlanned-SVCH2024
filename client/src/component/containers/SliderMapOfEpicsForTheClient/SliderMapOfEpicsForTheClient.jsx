import "./SliderMapOfEpicsForTheClient.css";
import { useDispatch, useSelector } from "react-redux";

import CardForEpic from "../../presentational/CardForEpic/CardForEpic";
import CustomerSlider from "../../CustomerSlider/CustomerSlider";


export default function SliderMapOfEpicsForTheClient({
  handleNextId = () => {},
  handleIndexChange = () => {},
}) {
  const selectedCustomer = useSelector(
    (state) => state.customer.epicsForSelectInTheCustomer
  );
  const dataForSelect = selectedCustomer.epicsData;
  
  return (  
    <CustomerSlider
      localStorageKey="currentEpicIndex"
      onHandleNextId={handleNextId}
      onIndexChange={handleIndexChange} // Передаем callback для изменения индекса
      notFoundMessage="Not found Epics in this customer"
      emptyCardComponent={CardForEpic}
    >
      {Array.isArray(dataForSelect) && dataForSelect.length > 0 ? (
        dataForSelect.map((item) => (
          <CardForEpic
            key={item.id}
            epicId={item.id}
            epicName={item.name}
          />
        ))
      ) : (
        <p className="not-found-message">No customers found in this project.</p>
      )}
    </CustomerSlider>
  );
}
