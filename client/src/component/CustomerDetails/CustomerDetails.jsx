import './CustomerDetails.css'

import CustomerButton from "../CustomerButton/CustomerButton";


export default function CustomerDetails({
    handleOnOpenUpdateModal = () => {},
    handleOnOpenDeleteModal= () => {}
}) {
    return (
      <div className="customer-actions-buttons">
        <CustomerButton textValue="Change customer" onClick={handleOnOpenUpdateModal} />
        <CustomerButton
          textValue="Delete customer"
          onClick={handleOnOpenDeleteModal}
        />
      </div>
    )
}