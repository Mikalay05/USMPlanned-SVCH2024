import "./CustomerModal.css";
import CustomerButton from "../CustomerButton/CustomerButton";

export default function CustomerModal({
  textTitle = "Modal Window",
  children,
  buttonTextContent = "Next",
  openModal = true,
  clickOnClose,
  clickOnButton,
  srcToIcon = '/icon-close-modal.svg'
}) {
  if (!openModal) return null;

  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal">
        <div className="customer-modal-header">
          <h3 className="customer-modal-title">{textTitle}</h3>
          <img
            className="close-icon-customer-modal"
            src={srcToIcon}
            onClick={clickOnClose}
            alt="Close"
          />
        </div>
        <div className="customer-modal-body">{children}</div>
        <div className="customer-modal-footer">
          <CustomerButton textValue={buttonTextContent} onClick={clickOnButton} />
        </div>
      </div>
    </div>
  );
}
