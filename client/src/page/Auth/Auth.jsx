import CustomerButton from "../../component/CustomerButton/CustomerButton";
import InputInFormWithError from "../../component/InputInFormWithError/InputInFormWithError";
import "./Auth.css"
export default function AuthComponent() {
    return (
        <section className="auth-section">
            <div className="left-section-auth">
                <h1>Sign in</h1>
            </div>
            <div className="right-section-auth">
                <div className="right-section-content">
                    <p>Hello!</p>
                    <InputInFormWithError placeholderValue="Login" iconName="Login-Icon.svg" textErrorValue="LoginErrpr"/>
                    <InputInFormWithError placeholderValue="Password"  textErrorValue="passwordError" isPassword={true}/>
                    <CustomerButton textValue="Sign In"/>
                </div>
            </div>
        </section>
    )
}