import React, { useEffect, useState } from "react";
import upload from "./services/api";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64, setBase64] = useState("");
  const [tags, setTags] = useState("");


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log(file);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // console.log(reader.result); // Base64 Data URL
        setBase64(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleTagChange = (e) => {
    setTags(e.target.value);
  };

  const handleUpload = async () => {
    const jsonData = {
      filename: selectedImage.name,
      uploadDate: selectedImage.lastModifiedDate,
      base64: base64,
      tags: tags.split(",").map((tag) => tag.trim()),
      likes: 0,
      comments: [],
    };

    console.log(jsonData);
    upload(jsonData)
      .then((response) => {
        setSelectedImage('');

        console.log("Image upload successful!", response);
        location.reload();
      })
      .catch((error) => {
        console.error("Image upload failed!", error);
      });
  };
  return (
    <div className="text-center">
      <input
        className="btn btn-info m-2"
        type="file"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div>
          <h2>Preview:</h2>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{maxHeight: '300px'}}
          />
        </div>
      )}
      <div className="m-2  d-flex justify-content-center">
        <input
          className="form-control border border-secondary w-50"
          type="text"
          placeholder="Add tags"
          value={tags}
          onChange={handleTagChange}
        />
        <button className="m-2" onClick={handleUpload}>
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
