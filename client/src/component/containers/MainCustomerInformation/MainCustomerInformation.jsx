import "./MainCustomerInformation.css";
import CustomerActionsData from "../CustomerActionsData/CustomerActionsData";
import CustomerDetails from "../../CustomerDetails/CustomerDetails";
import InformationForCustomer from "../../InformationForCustomer/InformationForCustomer";
import SliderControls from "../../SliderControls/SliderControls";

export default function MainCustomerInformation() {
  return (
    <main className="conteiner-MainCustomerInformation">
      <InformationForCustomer />
      <SliderControls />
      <CustomerDetails />
      <CustomerActionsData />
    </main>
  );
}
