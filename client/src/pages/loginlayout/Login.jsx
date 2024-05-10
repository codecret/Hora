import "./Login.css";
import FormRow from "../../components/FormRow";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { useGetAuth, useLoginAuth, useRegisterUser } from "../../hooks/useAuth";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};
const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const { mutateAsync: loginUser } = useLoginAuth({ setLoading });
  const { mutateAsync: registerUser } = useRegisterUser({
    setLoading,
    setValues,
  });
  useGetAuth({ state: "login" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember, values });
  };
  // Use useLocation hook to access location and state passed from Navbar
  const location = useLocation();

  // Access state passed from Navbar
  const isMemberFromNavbar = location.state?.isMember || false;

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      isMember: isMemberFromNavbar,
    }));
  }, [isMemberFromNavbar]);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (isMember) {
      if (!email || !password) {
        toast.error("Invalid Values", "danger");
        setLoading(false);
        return;
      }
      await loginUser({ name, email, password, isMember });
    } else {
      if (!name || !email || !password) {
        toast.error("Invalid Values", "danger");
        setLoading(false);
        return;
      }
      await registerUser({ name, email, password, isMember });
    }
    setLoading(false);
  };
  return (
    <div className="container-full-width-height">
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
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
              className={"form-input login-input"}
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
            className={"form-input login-input"}
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
            className={"form-input login-input"}
            divClassName={"inputDiv"}
          />
          <button
            className="reset-btn loginBtn"
            disabled={isLoading}
            onClick={onSubmit}
          >
            {values.isMember ? "Login" : "Register"}
          </button>
          <p className="notmember">
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button
              type="button"
              onClick={toggleMember}
              className="reset-btn member-btn"
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
