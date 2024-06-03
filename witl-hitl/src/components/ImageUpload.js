import Image from "next/image";

// components/ImageUpload.js
import { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    
    setLoading(true);
    // console.log(formData.get('image'));
    // console.log(image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const responseData = await response.json();
      const imageUrl = responseData.data;
      console.log("response : ", imageUrl);
      setUploadedImage(imageUrl);
    } else {
      console.error("Error uploading image: ", response.statusText);
    }
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!image || loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {uploadedImage && (
        <div>
          <h3>Uploaded Image:</h3>
          <Image
            src={uploadedImage}
            alt="Uploaded"
            width={500}
            height={500}
            layout="responsive"
            priority
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
