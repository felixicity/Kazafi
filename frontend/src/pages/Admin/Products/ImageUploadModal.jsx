import { useState } from "react";
import { FiImage, FiUpload } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

function ImageUploadModal({ isOpen, onClose, selectedFile, setSelectedFile }) {
      const [previewSrc, setPreviewSrc] = useState(null);

      // Handle file input change or drop
      const handleUpload = (file) => {
            if (file && file.type.match("image.*")) {
                  setSelectedFile(file);
                  // Preview the image using FileReader
                  const reader = new FileReader();
                  reader.onloadend = () => setPreviewSrc(reader.result);
                  reader.readAsDataURL(file);
                  onClose();
            } else {
                  alert("Please select a valid image file.");
            }
      };

      const handleUploadChange = (e) => {
            const file = e.target.files[0];
            handleUpload(file);
      };

      const handleDrop = (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            handleUpload(file);
      };

      const handleDragOver = (e) => {
            e.preventDefault();
      };

      if (!isOpen) return null; // Modal hidden if not open

      return (
            <div className="modal-overlay">
                  <div className="modal-content">
                        <button className="modal-close" onClick={onClose} aria-label="Close">
                              <FaTimes size={18} />
                        </button>
                        <h2 className="modal-title">Upload product image</h2>
                        <p className="modal-text">
                              Drag and drop a .jpg or .jpeg image from your computer, or click to select a file. <br />
                        </p>

                        <div
                              className="upload-dropzone"
                              onDragOver={handleDragOver}
                              onDrop={handleDrop}
                              onClick={() => document.getElementById("fileInput").click()}
                        >
                              {previewSrc ? (
                                    <img src={previewSrc} alt="Preview" className="image-preview" />
                              ) : (
                                    <div className="dropzone-text">
                                          <FiImage size={30} />
                                          <p>Drop image here or click to upload</p>
                                    </div>
                              )}
                              <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    onChange={handleUploadChange}
                                    multiple
                                    style={{ display: "none" }}
                              />
                        </div>

                        <div className="modal-buttons">
                              <button className="btn btn-secondary" onClick={onClose}>
                                    Cancel
                              </button>
                              <button
                                    className="btn btn-primary"
                                    onClick={() => handleUpload(selectedFile)}
                                    disabled={!selectedFile}
                              >
                                    <FiUpload /> Upload
                              </button>
                        </div>
                  </div>
            </div>
      );
}

export default ImageUploadModal;
