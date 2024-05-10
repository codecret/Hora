import { useOutletContext } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import Button from "../../components/Button";
import "./Settings.css";
import FormRow from "../../components/FormRow";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useEditProfile } from "../../hooks/useAuth";

const Settings = () => {
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

  return (
    <div className="sectionPadding">
      <form
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="profileForm"
      >
        <div className="topContainer">
          {file ? (
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
            <label className="mybtn secBtn" htmlFor="fileInput">
              Change Picture
              <input
                id="fileInput"
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
            <Button
              text={"Remove"}
              classNameCustom={"mybtn thirdBtn"}
              handleClick={handleRemove}
            />
          </div>
        </div>

        <div className="bodyContainer">
          <div className="wholeContainer">
            <div className="leftContainer">
              <p className="s-bodyHeader">User Information</p>
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

              <FormRow
                type={"number"}
                name={"phoneNumber"}
                divClassName={"inputDiv"}
                className={"fullWidth customInput"}
                handleChange={handleChange}
                value={editProfileInputs.phoneNumber}
                labelText={"Phone Number"}
                isLabelThere={true}
                label={"Phone number"}
              />
            </div>

            <div className="rightContainer">
              <p className="changepasswordtext">Change Your Password</p>
              <FormRow
                type={"password"}
                name={"password"}
                divClassName={"inputDiv"}
                className={"fullWidth customInput"}
                handleChange={handleChange}
                value={editProfileInputs.password}
                labelText={"password"}
                isLabelThere={true}
                label={"new password"}
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
              <button type="submit" className="mybtn secBtn absoluteBtn">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* <Link to={`/${user.id}/settings`}>Edit profile page</Link> */}
    </div>
  );
};

export default Settings;
