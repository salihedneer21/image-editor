import './ActionButtons.css';

const ActionButtons = ({ onEdit, onExportPNG, onExportConfig, onImportConfig, hasImage, hasEditedImage }) => {
  return (
    <div className="actions-container">
      <div className="action-card">
        <button
          onClick={onEdit}
          disabled={!hasImage}
          className="action-button"
        >
          Edit Image
        </button>
      </div>

      <div className="action-card">
        <button
          onClick={onExportPNG}
          disabled={!hasEditedImage}
          className="action-button"
        >
          Export PNG
        </button>
      </div>

      <div className="action-card">
        <button
          onClick={onExportConfig}
          disabled={!hasEditedImage}
          className="action-button"
        >
          Export Config
        </button>
      </div>

      <div className="action-card">
        <label className="action-button" style={{ margin: 0 }}>
          <input
            type="file"
            accept=".json"
            onChange={onImportConfig}
            className="file-input"
          />
          Import Config
        </label>
      </div>
    </div>
  );
};

export default ActionButtons;
