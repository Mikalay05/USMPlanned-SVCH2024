import './LoadingDots.css';

export default function LoadingDots({ color = '#000' }) {
  return (
    <div className="loading-dots-container">
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
      <div className="dot" style={{ backgroundColor: color }}></div>
    </div>
  );
}
