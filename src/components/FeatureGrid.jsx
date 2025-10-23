import './FeatureGrid.css';

const FeatureGrid = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Filters',
      description: 'Apply blur, brightness, contrast, saturation'
    },
    {
      icon: '✂️',
      title: 'Crop & Resize',
      description: 'Any aspect ratio, custom dimensions'
    },
    {
      icon: '🖊️',
      title: 'Text & Annotations',
      description: 'Add text with custom fonts and colors'
    },
    {
      icon: '🎨',
      title: 'Shapes & Drawing',
      description: 'Draw rectangles, circles, arrows, lines'
    },
    {
      icon: '🔄',
      title: 'Rotate & Flip',
      description: 'Transform images at any angle'
    },
    {
      icon: '💧',
      title: 'Watermarks',
      description: 'Add text or image watermarks'
    }
  ];

  return (
    <div className="features-container">
      <div className="features-header">
        <span>⚡</span>
        <h2>Powerful Features</h2>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
