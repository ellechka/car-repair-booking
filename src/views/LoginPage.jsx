import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
import { employeeAccount } from "./Employee";
import "./Login.css";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginPage = () => {
    const { setIsAuthenticated, setUserRole } = useAuth();
    const navigate = useNavigate();
    const [login, setLogin] = useState({ email: "", password: "" });
    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })

    const [loginErrors, setLoginErrors] = useState({});
    const [loginMessage, setLoginMessage] = useState("");
    const [registerErrors, setRegisterErrors] = useState({});
    const [registerMessage, setRegisterMessage] = useState("");

    function handleLoginChange(event) {
        const { name, value } = event.target;
        setLogin((current) => ({ ...current, [name]: value }));
        setLoginErrors((current) => ({ ...current, [name]: "", credentials: "" }));
        setLoginMessage("");
    }

    function handleRegisterChange(event) {
        const { name, value } = event.target;
        setRegister((current) => ({ ...current, [name]: value }));
        setRegisterErrors((current) => ({ ...current, [name]: ""}));
        setRegisterMessage("");
    }

    function handleLoginSubmit(event) {
        event.preventDefault();

        const nextErrors = {};

        if (!login.email.trim()) {
            nextErrors.email = "Please enter an email";
        } else if (!regexEmail.test(login.email)) {
            nextErrors.email = "Please enter a correct email";
        }

        if (!login.password) {
            nextErrors.password = "Enter a password";
        }

        setLoginErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) {
            const email = login.email.trim().toLowerCase();
            const employeeEmail = employeeAccount.email.toLowerCase();

            if (email === employeeEmail && login.password !== employeeAccount.password) {
                setLoginErrors({ credentials: "Email or password is incorrect" });
                setLoginMessage("");
                return;
            }

            setIsAuthenticated(true);
            if (email === employeeEmail) {
                setUserRole(employeeAccount.role);
                navigate("/employee");
            } else {
                setUserRole("customer");
                setLoginMessage("Demo login complete. Authentication is not connected to a server.");
            }
        } else {
            setLoginMessage("");
        }
    }

    function handleRegisterSubmit(event) {
        event.preventDefault();

        const nextErrors = {};

        if (!register.name.trim()) {
            nextErrors.name = "Please enter your name";
        }

        if (!register.email.trim()) {
            nextErrors.email = "Please enter your email";
        } else if (!regexEmail.test(register.email)) {
            nextErrors.email = "Please enter a correct email";
        }

        if (!register.password) {
            nextErrors.password = "Please enter a password";
        } else if (register.password.length < 8) {
            nextErrors.password = "Your password should contain min. 8 symbols";
            // TODO: add password's rules if needed, e.g. password should have symbools
        }

        if (!register.confirmPassword) {
            nextErrors.confirmPassword = "Please enter a password again";
        } else if (register.password !== register.confirmPassword) {
            nextErrors.confirmPassword = "Passwords don't match each other";
        }

        setRegisterErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) {
            setIsAuthenticated(true);
            setUserRole("customer");
            setRegisterMessage("Demo registration complete. Authentication is not connected to a server.");
        } else {
            setRegisterMessage("");
        }
    }

    return (
        <div className="guest-page">
            <main className="login-page">
                <div className="auth-panels">
                    <section className="login-card" aria-labelledby="login-title">
                        <h1 id="login-title">Log in</h1>
                        <h2>Customers and employees log in here.</h2>
                        <p>
                            Employee demo: {employeeAccount.email} / {employeeAccount.password}
                        </p>

                        <form onSubmit={handleLoginSubmit} noValidate>
                            <div className="form-field">
                                <label htmlFor="login-email">Email</label>
                                <input id="login-email"
                                       name="email"
                                       type="email"
                                       autoComplete="email"
                                       value={login.email}
                                       onChange={handleLoginChange}
                                       aria-invalid={Boolean(loginErrors.email)} />
                                {loginErrors.email && (
                                    <span className="field-error">{loginErrors.email}</span>
                                )}
                            </div>

                            <div className="form-field">
                                <label htmlFor="login-password">Password</label>
                                <input id="login-password"
                                       name="password"
                                       type="password"
                                       autoComplete="current-password"
                                       value={login.password}
                                       onChange={handleLoginChange}
                                       aria-invalid={Boolean(loginErrors.password)} />
                                {loginErrors.password && (
                                    <span className="field-error">{loginErrors.password}</span>
                                )}
                            </div>

                            <button className="submit-button" type="submit">Login</button>

                            {loginMessage && (
                                <p className="form-message" role="status">{loginMessage}</p>
                            )}
                            {loginErrors.credentials && (
                                <p className="field-error" role="alert">{loginErrors.credentials}</p>
                            )}
                        </form>
                    </section>

                    <section className="login-card" aria-labelledby="register-title">
                        <h1 id="register-title">Create an account</h1>
                        <h2>New customer? Register to book repairs and see your repair history.</h2>

                        <form onSubmit={handleRegisterSubmit} noValidate>
                            <div className="form-field">
                                <label htmlFor="register-name">Full name</label>
                                <input
                                    id="register-name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    value={register.name}
                                    onChange={handleRegisterChange}
                                    aria-invalid={Boolean(registerErrors.name)} />
                                {registerErrors.name && (
                                    <span className="field-error">{registerErrors.name}</span>)}
                            </div>

                            <div className="form-field">
                                <label htmlFor="register-email">Email</label>
                                <input
                                    id="register-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={register.email}
                                    onChange={handleRegisterChange}
                                    aria-invalid={Boolean(registerErrors.email)} />
                                {registerErrors.email && (
                                    <span className="field-error">{registerErrors.email}</span>)}
                            </div>

                            <div className="form-field">
                                <label htmlFor="register-phone">Phone</label>
                                <input
                                    id="register-phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    value={register.phone}
                                    onChange={handleRegisterChange} />
                            </div>

                            <div className="form-field">
                                <label htmlFor="register-password">Password</label>
                                <input
                                    id="register-password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={register.password}
                                    onChange={handleRegisterChange}
                                    aria-invalid={Boolean(registerErrors.password)} />
                                {registerErrors.password && (
                                    <span className="field-error">{registerErrors.password}</span>)}
                            </div>

                            <div className="form-field">
                                <label htmlFor="register-confirm-password">Confirm password</label>
                                <input
                                    id="register-confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    value={register.confirmPassword}
                                    onChange={handleRegisterChange}
                                    aria-invalid={Boolean(registerErrors.confirmPassword)} />
                                {registerErrors.confirmPassword && (
                                    <span className="field-error">{registerErrors.confirmPassword}</span>
                                )}
                            </div>

                            <button className="submit-button" type="submit">Register</button>

                            {registerMessage && (
                                <p className="form-message" role="status">
                                    {registerMessage}
                                </p>
                            )}
                        </form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default LoginPage;
