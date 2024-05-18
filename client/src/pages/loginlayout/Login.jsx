import "./Login.css";
import FormRow from "../../components/FormRow";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetAuth, useLoginAuth, useRegisterUser } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { IoIosArrowRoundBack } from "react-icons/io";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};
const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <div className="container-full-width-height">
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <div className="login-container">
        <div className="left-container">
          <IoIosArrowRoundBack
            className="back-arrow"
            size={23}
            onClick={handleNavigateHome}
          />

          <h2>{values.isMember ? t("Login") : t("Sign Up")}</h2>
          <p className="sub-title">
            {t("Secure Your Communication with Hora")}
          </p>
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
            {values.isMember ? t("Login") : t("Register")}
          </button>
          <div className="login-lower">
            <p className="notmember">
              {values.isMember
                ? t("Not a member yet?")
                : t("Already a member?")}
              <button
                type="button"
                onClick={toggleMember}
                className="reset-btn member-btn"
              >
                {values.isMember ? t("Register") : t("Login")}
              </button>
            </p>
            {values.isMember && (
              <Link to={"/forgot-password"} className="forgotText">
                {t("Forgot Password?")}
              </Link>
            )}
          </div>
        </div>
        <div className="right-container"></div>
      </div>
    </div>
  );
};

export default Login;
