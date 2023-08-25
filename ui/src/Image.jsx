import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('contact', contact);
    formData.append('image', file);

    try {
      await axios.post('https://localhost:7046/api/Products/img', formData);
      setUploadMessage('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      setUploadMessage('An error occurred while uploading the image');
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/jpeg, image/png"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default ImageUploadForm;
