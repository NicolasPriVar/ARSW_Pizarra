import './ColorPicker.css';

export default function ColorPicker({ color, setColor }) {
  return (
    <div className="color-picker">
      <label htmlFor="colorInput">Color:</label>
      <input
        id="colorInput"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}