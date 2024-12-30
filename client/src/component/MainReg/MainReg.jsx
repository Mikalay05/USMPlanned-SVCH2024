import "./MainReg.css";

import CustomerButton from '../CustomerButton/CustomerButton'
import CustomerSelect from "../CustomerSelect/CustomerSelect";

export default function MainReg({
    roleData
}) {
  return (
    <main>
      <h1>Create users:</h1>
      <div>
        <h3>Person data:</h3>
        <div>
            <CustomerSelect options={roleData}/>
        </div>
        <CustomerButton textValue="Registration" />
      </div>
    </main>
  );
}
