import React from 'react';
import './Aurora.css';

export default function Aurora({ 
  colorStops = ['#7cff67', '#B19EEF', '#5227FF'], 
  blend = 1.0, // Used to control overall opacity in this CSS version
  id = 'aurora-bg'
}) {
  // Extract colors with fallback
  const color1 = colorStops[0] || '#7cff67';
  const color2 = colorStops[1] || '#B19EEF';
  const color3 = colorStops[2] || '#5227FF';

  // Apply blend as base opacity wrapper to match previous API
  const containerStyle = {
    opacity: blend
  };

  return (
    <div id={id} className="aurora-container" style={containerStyle}>
      <div className="aurora-blur-layer">
        <div 
          className="aurora-wave-1" 
          style={{ background: `radial-gradient(circle, ${color1} 0%, transparent 70%)` }}
        />
        <div 
          className="aurora-wave-2" 
          style={{ background: `radial-gradient(circle, ${color2} 0%, transparent 70%)` }}
        />
        <div 
          className="aurora-wave-3" 
          style={{ background: `radial-gradient(circle, ${color3} 0%, transparent 70%)` }}
        />
      </div>
    </div>
  );
}
