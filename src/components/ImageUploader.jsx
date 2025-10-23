import './ImageUploader.css';

const ImageUploader = ({ onImageLoad, hasImage, fileName, onClear }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageLoad(file);
    }
  };

  return (
    <div className={`image-uploader ${hasImage ? 'image-loaded' : ''}`}>
      {!hasImage ? (
        <>
          <div className="upload-icon">📸</div>
          <h2 className="upload-title">Upload Your Image</h2>
          <p className="upload-subtitle">Select an image to start editing</p>
          <label className="upload-label">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="upload-input"
            />
            Choose Image
          </label>
        </>
      ) : (
        <>
          <div className="loaded-icon">✓</div>
          <h2 className="loaded-title">{fileName || 'Image Loaded'}</h2>
          <p className="loaded-subtitle">Ready to edit</p>
          <div className="upload-actions">
            <label className="upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="upload-input"
              />
              Change Image
            </label>
            <button onClick={onClear} className="clear-image-btn">Clear</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
