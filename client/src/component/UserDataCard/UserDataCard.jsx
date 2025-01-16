import './UserDataCard.css'
import CustomerButton from '../CustomerButton/CustomerButton'
import { useNavigate } from 'react-router-dom';

export default function UserDataCard({
  userData = {},
  textValueOfButtonChange
}) {
  const navigate = useNavigate();

  const handleOnClickButtonInUserCard = () => {
    navigate(`/user/${userData.id}`);
  }
  
  return (
    <div className="content-user-data-card">
      <div className="role-user-data-card">
        {userData.role?.name} {userData.login}
      </div>
      <div className="name-user-data-card">
        {userData.surname} {userData.name} {userData.patronymic}
      </div>
      <div className="contact-user-data-card">
        Email: {userData.email}; phone: {userData.phone}
      </div>
      <CustomerButton onClick={handleOnClickButtonInUserCard} textValue={textValueOfButtonChange} />
    </div>
  )
}
