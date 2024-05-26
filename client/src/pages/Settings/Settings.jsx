import { useOutletContext } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import Button from "../../components/Button";
import FormRow from "../../components/forms/FormRow";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useEditProfile } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import Wrapper from "../../assets/styles/SettingsWrapper";

const Settings = () => {
  const { t } = useTranslation();
  const user = useOutletContext();
  const [file, setFile] = useState(null);
  const [editProfileInputs, setEditProfileInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const { mutateAsync: editProfile } = useEditProfile();
  useEffect(() => {
    if (user) {
      setEditProfileInputs({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
      setFile({ preview: user.photoUrl || null });
    }
  }, [user]);
  const handleRemove = (event) => {
    event.preventDefault();
    setFile(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = editProfileInputs;
    if (!name || !email) {
      toast.error("Fill required Values");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords doesn't match");
      return;
    }
    let formData = new FormData();
    if (file) {
      formData.append("file", file.data);
    }
    formData.append("editProfileInputs", JSON.stringify(editProfileInputs));
    await editProfile({ formData });
  };
  const handleFileChange = (e) => {
    var binaryData = [];
    binaryData.push(e.target.files[0]);
    var result = window.URL.createObjectURL(
      new Blob(binaryData, { type: "application/zip" })
    );
    const img = {
      preview: result,
      data: e.target.files[0],
    };
    setFile(img);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfileInputs({
      ...editProfileInputs,
      [name]: value,
    });
  };
  const handleChangePhone = (name, value) => {
    setEditProfileInputs({
      ...editProfileInputs,
      [name]: value,
    });
  };
  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="profileForm"
      >
        <div className="topContainer">
          {file?.preview ? (
            <img src={file.preview} alt="Preview" className="image" />
          ) : (
            <FaCircleUser
              size={160}
              className="image"
              style={{
                color: "#BCBCBC",
                backgroundColor: "#FFFFFF",
              }}
            />
          )}

          <div className="btnContainer">
            <label className="mybtn secBtn change-pic-btn" htmlFor="fileInput">
              {t("Change Picture")}
              <input
                id="fileInput"
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
            <Button
              text={t("Remove")}
              classNameCustom={"mybtn thirdBtn"}
              handleClick={handleRemove}
            />
          </div>
        </div>

        <div className="bodyContainer">
          <div className="wholeContainer">
            <div className="leftContainer">
              <p className="s-bodyHeader">{t("User Information")}</p>
              <FormRow
                type={"text"}
                name={"name"}
                divClassName={"inputDiv"}
                className={"fullWidth customInput"}
                handleChange={handleChange}
                value={editProfileInputs.name}
                labelText={"Name"}
                isLabelThere={true}
                label={"Full Name"}
              />

              <FormRow
                type={"email"}
                name={"email"}
                divClassName={"inputDiv"}
                className={"fullWidth customInput"}
                handleChange={handleChange}
                value={editProfileInputs.email}
                labelText={"Email"}
                isLabelThere={true}
                label={"New Email"}
              />
              <PhoneInput
                country={"tr"}
                specialLabel={t("Phone Number")}
                value={editProfileInputs.phoneNumber}
                onChange={(phone) => {
                  handleChangePhone("phoneNumber", phone);
                }}
              />
            </div>

            <div className="rightContainer">
              <p className="changepasswordtext">{t("Change Your Password")}</p>
              <div className="passwordChange">
                <FormRow
                  type={"password"}
                  name={"password"}
                  divClassName={"inputDiv"}
                  className={"fullWidth customInput"}
                  handleChange={handleChange}
                  value={editProfileInputs.password}
                  labelText={"password"}
                  isLabelThere={true}
                  label={"New Password"}
                />
                <FormRow
                  type={"password"}
                  name={"confirmPassword"}
                  divClassName={"inputDiv"}
                  className={"fullWidth customInput"}
                  handleChange={handleChange}
                  value={editProfileInputs.confirmPassword}
                  labelText={"Confirm New Password"}
                  label={"Confirm New Password"}
                />
              </div>
              <button type="submit" className="mybtn secBtn absoluteBtn">
                {t("Save")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Settings;
