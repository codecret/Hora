import "./Login.css";
import FormRow from "../../components/FormRow";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};
const Login = () => {
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phoneNumber, username, password } = values;
    if (!name || !email || !phoneNumber || !username || !password) {
      toast.error("Invalid Values", "danger");
      return;
    }
    const currentUser = { name, email, phoneNumber, username, password };
    // await registerAdmin({ currentUser });
  };
  return (
    <div className="container-full-width-height">
      <div className="login-container">
        <div className="left-container">
          {values.isMember && (
            <Link to={"/forgot-password"} className="forgotText">
              Forgot Password?
            </Link>
          )}
          <h2>{values.isMember ? "Login" : "SignUp"}</h2>
          <p className="sub-title">Secure Your Communication with Hora</p>
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
              isLabelThere={true}
              label={"Name"}
              className={"login-input"}
              divClassName={"inputDiv"}
            />
          )}
          <FormRow
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            isLabelThere={true}
            label={"Email"}
            className={"login-input"}
            divClassName={"inputDiv"}
          />
          <FormRow
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            isLabelThere={true}
            label={"Password"}
            className={"login-input"}
            divClassName={"inputDiv"}
          />
          <button
            className="btn loginBtn"
            // disabled={isLoading}
            onClick={onSubmit}
          >
            Sign In
          </button>
          <p className="notmember">
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button
              type="button"
              onClick={toggleMember}
              className="btn member-btn"
            >
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </div>
        <div className="right-container"></div>
      </div>
    </div>
  );
};

export default Login;
