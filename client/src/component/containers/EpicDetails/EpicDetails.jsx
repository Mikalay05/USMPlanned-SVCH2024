import './EpicDetails.css'

import CustomerButton from "../CustomerButton/CustomerButton";


export default function EpicDetails({
    handleOnOpenUpdateModal = () => {},
    handleOnOpenDeleteModal= () => {}
}) {
    return (
      <div className="epic-actions-buttons">
        <CustomerButton textValue="Change epic" onClick={handleOnOpenUpdateModal} />
        <CustomerButton
          textValue="Delete epic"
          onClick={handleOnOpenDeleteModal}
        />
      </div>
    )
}