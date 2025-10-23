import './PreviewCard.css';

const PreviewCard = ({ imageData }) => {
  if (!imageData) return null;

  return (
    <div className="preview-card">
      <div className="preview-header">
        <span>✓</span>
        <h2>Saved</h2>
      </div>

      <div className="preview-content">
        <div className="preview-grid">
          <div className="preview-item">
            <span className="preview-label">{imageData.fullName || 'Untitled.png'}</span>
            <span className="preview-value"> • {imageData.width} × {imageData.height}px</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
