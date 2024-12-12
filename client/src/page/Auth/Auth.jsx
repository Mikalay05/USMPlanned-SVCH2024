import InputInFormWithError from "../../component/InputInFormWithError/InputInFormWithError";

export default function AuthComponent() {
    return (
        <section>
            <div>
                <h1>Sign in</h1>
            </div>
            <div>
                <div>
                    <p>Hello!</p>
                    <InputInFormWithError placeholderValue="Login" iconName="Login-Icon.svg" textErrorValue="LoginErrpr"/>
                    <InputInFormWithError placeholderValue="Password"  textErrorValue="passwordError" isPassword={true}/>
                </div>
            </div>
        </section>
    )
}