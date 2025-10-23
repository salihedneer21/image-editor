import { useState } from 'react';
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';
import Header from './Header';
import ImageUploader from './ImageUploader';
import ActionButtons from './ActionButtons';
import FeatureGrid from './FeatureGrid';
import PreviewCard from './PreviewCard';
import './PhotoEditor.css';

const PhotoEditor = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [savedState, setSavedState] = useState(null);
  const [configFileName, setConfigFileName] = useState('');
  const [editedImage, setEditedImage] = useState(null);

  const handleImageLoad = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setImageFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImageSrc('');
    setImageFileName('');
    setEditedImage(null);
  };

  const handleEdit = () => {
    if (imageSrc) {
      setIsEditorOpen(true);
    }
  };

  const handleSave = (editedImageObject, designState) => {
    console.log('✅ Image saved:', editedImageObject);
    console.log('✅ Design state:', designState);

    setEditedImage(editedImageObject);
    setSavedState(designState);
    setIsEditorOpen(false);
  };

  const handleExportPNG = () => {
    if (!editedImage) {
      alert('⚠️ Please edit and save an image first!');
      return;
    }

    try {
      if (editedImage.imageCanvas) {
        editedImage.imageCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = editedImage.fullName || 'edited-image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log('✅ PNG exported successfully!');
          }
        }, 'image/png', 1.0);
      } else if (editedImage.imageBase64) {
        const a = document.createElement('a');
        a.href = editedImage.imageBase64;
        a.download = editedImage.fullName || 'edited-image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log('✅ PNG exported successfully!');
      } else {
        console.error('❌ Export failed - no valid image data', editedImage);
        alert('❌ Export failed. Please try editing the image again.');
      }
    } catch (error) {
      console.error('❌ Export error:', error);
      alert('❌ Export failed: ' + error.message);
    }
  };

  const handleExportConfig = () => {
    if (!savedState) {
      alert('⚠️ Please edit and save an image first!');
      return;
    }

    try {
      console.log('Saved state:', savedState);

      // Extract annotations from the design state
      let annotations = [];

      if (Array.isArray(savedState?.annotations)) {
        annotations = savedState.annotations;
      } else if (savedState?.annotations && typeof savedState.annotations === 'object') {
        // If annotations is an object, convert to array
        annotations = Object.values(savedState.annotations);
      }

      if (!annotations || annotations.length === 0) {
        alert('⚠️ No annotations found to export. Please add some text or shapes first.');
        return;
      }

      // Keep ALL properties from annotations - don't simplify
      const simplifiedAnnotations = annotations.map(annotation => {
        // Return the entire annotation object with all its properties
        return { ...annotation };
      });

      const config = {
        version: '2.0',
        annotations: simplifiedAnnotations,
        timestamp: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(config, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `config-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log('✅ Configuration exported successfully!');
      console.log('Simplified annotations:', simplifiedAnnotations);
    } catch (error) {
      console.error('❌ Config export error:', error);
      console.error('Saved state:', savedState);
      alert('❌ Failed to export configuration: ' + error.message);
    }
  };

  const handleImportConfig = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const config = JSON.parse(event.target.result);

        if (config.version === '2.0' && config.annotations) {
          const designState = {
            annotations: config.annotations,
          };
          setSavedState(designState);
          setConfigFileName(file.name);
          console.log('✅ Configuration imported successfully!');
          console.log('Annotations:', config.annotations);
        } else {
          throw new Error('Invalid configuration file');
        }

        e.target.value = '';
      } catch (error) {
        console.error('❌ Import error:', error);
        alert('❌ Failed to import configuration: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  const handleClearConfig = () => {
    setSavedState(null);
    setConfigFileName('');
  };

  return (
    <div className="photo-editor">
      {!isEditorOpen && (
        <>
          <Header />

          <div className="editor-container">
            <div className="editor-content">
              <ImageUploader
                onImageLoad={handleImageLoad}
                hasImage={!!imageSrc}
                fileName={imageFileName}
                onClear={handleClearImage}
              />

              {configFileName && (
                <div className="config-status">
                  <span>📋 Config: {configFileName}</span>
                  <button onClick={handleClearConfig} className="clear-btn">×</button>
                </div>
              )}

              {imageSrc && (
                <ActionButtons
                  onEdit={handleEdit}
                  onExportPNG={handleExportPNG}
                  onExportConfig={handleExportConfig}
                  onImportConfig={handleImportConfig}
                  hasImage={!!imageSrc}
                  hasEditedImage={!!editedImage}
                />
              )}

              {editedImage && <PreviewCard imageData={editedImage} />}
            </div>
          </div>
        </>
      )}

      {isEditorOpen && (
        <div className="editor-fullscreen">
          <FilerobotImageEditor
            source={imageSrc}
            onSave={handleSave}
            onClose={() => setIsEditorOpen(false)}
            annotationsCommon={{ fill: '#000000' }}
            Text={{ text: 'Type here...' }}
            Rotate={{ angle: 90, componentType: 'slider' }}
            tabsIds={[
              TABS.ADJUST,
              TABS.ANNOTATE,
              TABS.WATERMARK,
              TABS.FILTERS,
              TABS.FINETUNE,
              TABS.RESIZE
            ]}
            defaultTabId={TABS.ANNOTATE}
            defaultToolId={TOOLS.TEXT}
            savingPixelRatio={1}
            previewPixelRatio={1}
            loadableDesignState={savedState}
            defaultSavedImageState={savedState}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoEditor;
