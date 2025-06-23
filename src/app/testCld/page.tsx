"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function TestClg() {
  console.log("hello");
  // client-side upload
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Next_expenseManagement_app"); // 🔥 LỘ Ở ĐÂY
    // Giả sử cloud_name là: "your_cloud_name"

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwl3srxep/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log("Image URL:", data.secure_url);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );

  // widget upload

  // return (
  //   <div>
  //     <h1>Upload Image App</h1>
  //     <CldUploadWidget
  //       signatureEndpoint="/api/sign-cloudinary-params"
  //       onSuccess={(result) => {
  //         console.log(result);
  //       }}
  //     >
  //       {({ open }) => {
  //         return <button onClick={() => open()}>Upload an Image</button>;
  //       }}
  //     </CldUploadWidget>
  //   </div>
  // );
}
