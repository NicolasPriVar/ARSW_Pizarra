import './BotonBorrar.css';

export default function BotonBorrar({ onClear }) {
  return (
    <button className="boton-borrar" onClick={onClear}>
      🧹 Borrar todo
    </button>
  );
}