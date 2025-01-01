import './UserDataCard.css'
import CustomerButton from '../CustomerButton/CustomerButton'

export default function UserDataCard({
  userData = {},
  textValueOfButtonChange
}) {
  console.log(userData)
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
      <CustomerButton textValue={textValueOfButtonChange} />
    </div>
  )
}
