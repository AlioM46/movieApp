import React, {useState} from "react";
import {FaCloudArrowDown} from "react-icons/fa6";
import "./dropImage.css";
const DropImage = ({title, setter, value}) => {
  const [img, setImg] = useState("");

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImg(base64);
    setter(base64);
  };

  return (
    <div className="dropImage">
      <label htmlFor="">{title}</label>
      <FaCloudArrowDown />
      <input
        accept="images/jpeg, images/png, images/jpg"
        type="file"
        onChange={(e) => handleUploadImage(e)}
      />

      <span>Drag Your Image Here</span>
      <em>(only .jpg and .png files will be accepted)</em>
      <img src={img ? img : value} alt="" />
    </div>
  );
};

function convertToBase64(file) {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      res(fileReader.result);
    };

    fileReader.onerror = (err) => {
      rej(err);
    };
  });
}

export default DropImage;
