import { useState } from "react";
import useQuery from "../../utils/useQuery";
import toast, { Toaster } from "react-hot-toast";
import { useResetPassword } from "../../hooks/useAuth";
import FormRow from "../../components/forms/FormRow";
import Wrapper from "../../assets/styles/ResetPassword";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t } = useTranslation();
  const query = useQuery();
  const navigate = useNavigate();
  const token = query.get("token");
  const { mutateAsync: resetPassword } = useResetPassword();
  const [values, setValues] = useState({
    password: "",
    verifyPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const { password, verifyPassword } = values;

      if (password !== verifyPassword) {
        toast.error(t("Passwords do not match"));
        return;
      }

      await resetPassword({ password, token });

      toast.success(t("Password reset successfully!"));
      setValues({ password: "", verifyPassword: "" });
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleNavigateHome = () => {
    navigate("/login");
  };
  return (
    <Wrapper>
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
            <h3>{t("Reset your Password")}</h3>
            <FormRow
              type="text"
              placeholder="Password"
              name="password"
              value={values.password}
              handleChange={handleChange}
              labelText={t("Password")}
              className={"form-input login-input"}
              divClassName={"inputDiv"}
            />
            <FormRow
              type="text"
              placeholder="Password"
              name="verifyPassword"
              value={values.verifyPassword}
              handleChange={handleChange}
              labelText={t("Verify Password")}
              className={"form-input login-input"}
              divClassName={"inputDiv"}
            />
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="mybtn loginBtn forgetPasswordBtn"
            >
              {isLoading ? t("Sending...") : t("Send")}
            </button>
          </div>
          <div className="right-container-forget-password">
            <div className="forgetContainer"></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
