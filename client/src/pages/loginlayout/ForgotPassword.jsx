import Wrapper from "../../assets/styles/ForgetPasswordWrapper";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForgotPassword } from "../../hooks/useAuth";
import FormRow from "../../components/forms/FormRow";
import { useTranslation } from "react-i18next";
import mailimage from "/mailimage.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showFields, setShowFields] = useState(true);
  const { mutateAsync: forgotPassword } = useForgotPassword({ setShowFields });
  const { t } = useTranslation();

  const handleSendEmail = async () => {
    if (!email && isLoading) {
      toast.error(t("Please fill the email"));
      return;
    }
    setLoading(true);
    try {
      await forgotPassword({ email });
      toast.success(t("Reset password email sent successfully!"));
    } finally {
      setLoading(false);
    }
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
        {showFields ? (
          <div className="login-container">
            <div className="left-container">
              <IoIosArrowRoundBack
                className="back-arrow"
                size={23}
                onClick={handleNavigateHome}
              />
              <h3 className="forgotText">{t("Forgot Password")}</h3>
              <p className="sub-title">
                {t(
                  "Don't worry, it happens to all of us. Enter your email below to recover your password"
                )}
              </p>

              <div className="w-100">
                <FormRow
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                  isLabelThere={true}
                  label={t("Email")}
                  className={"form-input login-input"}
                  divClassName={"inputDiv"}
                />
                <button
                  onClick={handleSendEmail}
                  disabled={isLoading}
                  className="mybtn loginBtn forgetPasswordBtn"
                >
                  {isLoading ? t("Sending...") : t("Send Code")}
                </button>
              </div>
            </div>
            <div className="right-container-forget-password">
              <div className="forgetContainer"></div>
            </div>
          </div>
        ) : (
          <div className="imagesentcontainer">
            <div className="imagecontainercontent">
              <IoIosArrowRoundBack
                className="back-arrow"
                size={30}
                onClick={handleNavigateHome}
              />
              <img src={mailimage} alt="mail image" width={200} />
              <h3>{t("Check your email")}</h3>
              <p>
                {t("We’ve sent password recovery instructions to")} {email}
              </p>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ForgotPassword;
