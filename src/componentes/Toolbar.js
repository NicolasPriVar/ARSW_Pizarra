import ColorPicker from './ColorPicker';
import './ToolBar.css';

export default function Toolbar({ color, setColor, lineWidth, setLineWidth }) {
    return (
        <div className="toolbar">
              <ColorPicker color={color} setColor={setColor} />
              <label>
                Grosor:
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(e.target.value)}
                />
              </label>
            </div>
    );
}