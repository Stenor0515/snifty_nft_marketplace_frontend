import React, { useState } from "react";
// import profileImage from "../../../../assets/images/user.jpg";
import placeHolderUser from "../../../../assets/images/placeholderUser.png";
import { HiOutlineUpload } from "react-icons/hi";
import Switch from "../switch";
const EditForm = (props) => {
  const [profileImage, setProfileImage] = useState(false);
  const [value, setValue] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const fileHandler = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <div className="text-dark-600">
      {/* EditForm */}
      <h2 className="w-full text-center border-b pb-2 border-gray-600 cursor-pointer">
        Edit Profile
      </h2>

      <div className="grid lg:grid-cols-2 mt-10">
        <form action="">
          <Input label="Username" required={true} />
          <div className=" bg-gray-200 grid grid-flow-col gap-x-20 my-8 p-2 items-center justify-center">
            <div className=" w-28 h-28 rounded-full overflow-hidden">
              <img
                src={
                  profileImage
                    ? "https://user-profile-images-cdn-bucket.storage.googleapis.com/0x0ef1b8e7564a7c0e6c52dff0b09ddc3954527d4c_avatar?ignoreCache=1644721340652"
                    : placeHolderUser
                }
                alt=""
              />
            </div>
            <div className="">
              <button
                onClick={fileHandler}
                className="text-gray-400 border flex items-center justify-between border-gray-300 p-2 bg-white rounded-md"
              >
                <span className="text-xl inline-block mr-4 ">
                  <HiOutlineUpload />
                </span>
                <span>Upload cover image</span>
              </button>
              <input
                type="file"
                className="hidden"
                ref={hiddenFileInput}
                name=""
                id=""
              />
            </div>
          </div>
          <Input label="Bio" textArea />
          <Input label="Email" placeholder={"Email"} />
          <div className="grid grid-flow-col justify-start gap-x-2 my-8">
            <Switch
              isOn={value}
              onColor="#5165ff"
              handleToggle={() => setValue((prev) => !prev)}
            />
            <p>Notification {value ? "Enabled" : "Disabled"}</p>
          </div>
          <Input
            label="Website"
            helperText="For example, https://iNf4mation.com"
          />
          <Input
            label="Twitter handle"
            helperText="For example, iNf4mation_io"
          />
          <Input
            label="Instagram name"
            helperText="For example, iNf4mation.io
"
          />
          <Input label="Location" />
          <div className="flex items-center justify-between">
            <button className="py-2 px-6 rounded-md bg-blue-500 text-white" onClick={() => {props.setEditProfile(false)}}>
              Save profile
            </button>
            <button className="py-2 px-6 rounded-md border border-gray-400  " onClick={() => {props.setEditProfile(false)}}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;

const Input = ({
  label = "Username",
  required = false,
  textArea = false,
  placeholder,
  helperText = "",
}) => {
  return (
    <div className="my-6">
      <label htmlFor="" className="text-gray-500  font-thin mb-1 inline-block">
        {label} {required && "*"}
      </label>
      <div className="border border-gray-500 rounded-md overflow-hidden">
        {!textArea ? (
          <input
            type="text"
            required={required}
            className="py-2 pr-10 pl-2 w-full h-full focus:outline-none"
            placeholder={placeholder}
          />
        ) : (
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            className="p-4 w-full h-full focus:outline-none"
          ></textarea>
        )}
      </div>
      <p className="text-xs font-thin mt-1">{helperText}</p>
    </div>
  );
};

// const TextArea =()=>
