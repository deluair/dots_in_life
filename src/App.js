import React, { useState } from 'react';

const App = () => {
  // Constants for our visualization
  const yearsInLife = 90;
  const monthsPerYear = 12;
  const monthsPerRow = 36; // 3 years per row
  const totalMonths = yearsInLife * monthsPerYear;
  const rowCount = Math.ceil(totalMonths / monthsPerRow);
  
  // State for user's age
  const [age, setAge] = useState(30);
  const currentMonth = Math.floor(age * 12);
  
  // Handle age change
  const handleAgeChange = (e) => {
    const newAge = parseInt(e.target.value);
    setAge(newAge);
  };
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem',
    maxWidth: '72rem',
    margin: '0 auto',
  };
  
  const titleStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
  };
  
  const sliderContainerStyle = {
    width: '100%',
    maxWidth: '28rem',
    marginBottom: '2rem',
  };
  
  const sliderLabelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  };
  
  const sliderStyle = {
    width: '100%',
    height: '0.5rem',
    backgroundColor: '#e5e7eb',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  };
  
  const sliderMarkersStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.25rem',
  };
  
  const legendStyle = {
    width: '100%',
    textAlign: 'center',
    marginBottom: '1.5rem',
  };
  
  const legendTextStyle = {
    fontSize: '1.25rem',
    color: '#f97316',
  };
  
  const rowStyle = {
    display: 'flex',
    marginBottom: '0.25rem',
    position: 'relative',
  };
  
  const monthsRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.25rem',
    width: '100%',
  };
  
  const legendItemsStyle = {
    marginTop: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
  };
  
  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
  };
  
  const dotStyle = {
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    border: '2px solid #9ca3af',
    marginRight: '0.5rem',
  };
  
  const attributionStyle = {
    marginTop: '1.5rem',
    textAlign: 'right',
    width: '100%',
    color: '#6b7280',
  };
  
  return (
    <div style={containerStyle}>
      {/* Title */}
      <h1 style={titleStyle}>
        A 90-Year Human Life in <span style={{color: '#dc2626'}}>Months</span>
      </h1>
      
      {/* Age Selector */}
      <div style={sliderContainerStyle}>
        <div style={sliderLabelStyle}>
          <label htmlFor="age-slider" style={{fontSize: '1.125rem', fontWeight: '500'}}>Your Age: {age} years</label>
          <span style={{fontSize: '1.125rem'}}>({currentMonth} months)</span>
        </div>
        <input
          id="age-slider"
          type="range"
          min="0"
          max="90"
          value={age}
          onChange={handleAgeChange}
          style={sliderStyle}
        />
        <div style={sliderMarkersStyle}>
          <span>0</span>
          <span>30</span>
          <span>60</span>
          <span>90</span>
        </div>
      </div>
      
      {/* Legend */}
      <div style={legendStyle}>
        <div style={legendTextStyle}>
          Each row is 36 months = 3 years
        </div>
      </div>
      
      {/* Grid container */}
      <div style={{width: '100%'}}>
        {Array.from({ length: rowCount }).map((_, rowIndex) => {
          const startMonth = rowIndex * monthsPerRow;
          
          return (
            <div key={rowIndex} style={rowStyle}>
              
              {/* Months in this row */}
              <div style={monthsRowStyle}>
                {Array.from({ length: monthsPerRow }).map((_, monthIndex) => {
                  const absoluteMonthIndex = startMonth + monthIndex;
                  
                  // Skip rendering beyond total months
                  if (absoluteMonthIndex >= totalMonths) return null;
                  
                  // Base dot style
                  const monthDotStyle = {
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: '2px solid #9ca3af',
                    display: 'inline-block'
                  };
                  
                  // Check if this is the current month based on age
                  if (absoluteMonthIndex === currentMonth) {
                    monthDotStyle.backgroundColor = '#FF5722';
                    monthDotStyle.borderColor = '#FF5722';
                    monthDotStyle.boxShadow = '0 0 0 2px rgba(255, 87, 34, 0.5)';
                    monthDotStyle.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
                  }
                  // Past months - fill up to the current age
                  else if (absoluteMonthIndex < currentMonth) {
                    monthDotStyle.backgroundColor = '#2196F3';
                    monthDotStyle.borderColor = '#1976D2';
                  }
                  // Future months - explicit transparent background
                  else {
                    monthDotStyle.backgroundColor = 'transparent';
                  }
                  
                  return (
                    <div 
                      key={monthIndex} 
                      style={monthDotStyle}
                      title={`Month ${absoluteMonthIndex + 1}: ${Math.floor(absoluteMonthIndex / 12)} years, ${absoluteMonthIndex % 12} months`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend for current position */}
      <div style={legendItemsStyle}>
        <div style={legendItemStyle}>
          <div style={{...dotStyle, backgroundColor: '#FF5722', borderColor: '#FF5722'}}></div>
          <span>Current age</span>
        </div>
        <div style={legendItemStyle}>
          <div style={{...dotStyle, backgroundColor: '#2196F3', borderColor: '#1976D2'}}></div>
          <span>Months lived</span>
        </div>
        <div style={legendItemStyle}>
          <div style={{...dotStyle, backgroundColor: 'transparent'}}></div>
          <span>Future months</span>
        </div>
      </div>
      
      {/* Attribution */}
      <div style={attributionStyle}>
        Inspired by age
      </div>
    </div>
  );
};

export default App;