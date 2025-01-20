import './MainCustomerInformation.css'
import CustomerActionsData from '../CustomerActionsData/CustomerActionsData'
import CustomerDetails from '../CustomerDetails/CustomerDetails'
import InformationForCustomer from '../InformationForCustomer/InformationForCustomer'
export default function MainCustomerInformation() {
    return (
        <main>
            <InformationForCustomer/>
            <CustomerDetails />
            <CustomerActionsData />
        </main>
    )
}