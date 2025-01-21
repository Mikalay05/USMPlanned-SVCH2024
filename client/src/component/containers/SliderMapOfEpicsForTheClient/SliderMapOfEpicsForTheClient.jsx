import "./SliderMapOfEpicsForTheClient.css";
import { useDispatch, useSelector } from "react-redux";

import SliderControls from "../../presentational/SliderControls/SliderControls";
import CardForEpic from "../../presentational/CardForEpic/CardForEpic";
import LoadingDots from '../../presentational/LoadingDots/LoadingDots'
export default function SliderMapOfEpicsForTheClient({}) {
  const epicsForSelectFotTheCustomer = useSelector(
    (state) => state.customer.epicsForSelectInTheCustomer
  );
  const data = epicsForSelectFotTheCustomer.epicsData ;
  if (epicsForSelectFotTheCustomer.isLoading) {
    return (
      <div>
        Loading...
        <LoadingDots />
      </div>
    );
  }
  return (
    <SliderControls>
      {data.map((item, index) => (
        <CardForEpic key={index} dataOfObject={item} />
      ))}
    </SliderControls>
  );
}
