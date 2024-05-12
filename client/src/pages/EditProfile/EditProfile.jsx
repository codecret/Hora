import { useEffect, useState } from "react";
import { authFetch } from "../../utils/fetch";
import { FormRow } from "../../components/FormRow";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const { id } = useParams();
  const user = useOutletContext();
  const [editProfileInputs, setEditProfileInputs] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setEditProfileInputs({
        email: user.email || "",
        name: user.name || "",
      });
    }
  }, [id, user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = editProfileInputs;
    if (!name || !email) {
      toast.error("Fill required Values");
      return;
    }
    let formData = new FormData();
    if (file) {
      formData.append("file", file.data);
    }
    formData.append("editProfileInputs", JSON.stringify(editProfileInputs));

    const response = await authFetch.post("auth/editProfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      toast.success("Updated.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
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
    <div className="containerWallpaper">
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <div className="editProfileContainer">
        <Link className="back" to={"/"}>
          Back
        </Link>
        <h1>Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
          className="profileForm"
        >
          <div className="profilePicInput">
            <label htmlFor="profile">Profile Picture:</label>
            {file && (
              <img
                src={file.preview}
                alt="Preview"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
            <input type="file" name="file" onChange={handleFileChange}></input>
          </div>

          <FormRow
            type={"text"}
            name={"name"}
            divClassName={"w-100 projectDiv margin-0"}
            className={"borderedDiv w-100"}
            handleChange={handleChange}
            value={editProfileInputs.name}
            labelText={"name"}
            required={true}
          />
          <FormRow
            type={"email"}
            name={"email"}
            divClassName={"w-100 projectDiv margin-0"}
            className={"borderedDiv w-100"}
            handleChange={handleChange}
            value={editProfileInputs.email}
            labelText={"email"}
            required={true}
          />
          <FormRow
            type={"password"}
            name={"password"}
            divClassName={"w-100 projectDiv margin-0"}
            className={"borderedDiv w-100"}
            handleChange={handleChange}
            value={editProfileInputs.password}
            labelText={"password"}
          />

          <button type="submit" className="btn customBtn main-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
