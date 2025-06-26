# 🖌️ Pizarra Interactiva con React

Este proyecto es una aplicación web que permite al usuario dibujar sobre una pizarra, cambiar el color del trazo, ajustar el grosor del pincel, y borrar completamente el lienzo. La interfaz es amigable, responsiva y está construida completamente con React.js usando componentes funcionales y hooks.

---

## 🚀 Tecnologías usadas

- ⚛️ React.js (con hooks: `useState`, `useEffect`, `useRef`)
- 🎨 HTML5 Canvas
- 💅 CSS3 (componentes estilizados)
- 🧹 Clean UI con componentes reutilizables

---

## 🧠 ¿Qué es React?

**React** es una biblioteca de JavaScript desarrollada por Facebook para construir interfaces de usuario. Su enfoque está basado en componentes, lo que permite dividir una aplicación en piezas reutilizables y modulares.

### Principales características:
- **Declarativo**: describe qué debe mostrarse, no cómo.
- **Componentes**: unidades reutilizables con lógica y vista.
- **Virtual DOM**: actualizaciones eficientes y rápidas.
- **Hooks**: funciones como `useState` o `useEffect` permiten manejar estado y efectos secundarios sin clases.

React facilita el desarrollo de interfaces complejas mediante la composición de componentes simples y manejables.

---

## ⚙️ ¿Cómo funciona cada componente?
App.jsx
- Componente principal que define el estado global del color y grosor del trazo.
- Integra Toolbar y CanvasBoard.

CanvasBoard.jsx
- Lienzo para dibujar usando HTML5 <canvas>.
- Usa useRef para acceder al contexto del canvas y useState para controlar si el usuario está dibujando.
Implementa funciones:
- startDrawing, draw, stopDrawing: controlan la interacción del mouse.
- clearCanvas: borra todo el lienzo.
- Incluye el botón lateral para limpiar el canvas (BotonBorrar).

Toolbar.jsx
- Muestra el componente ColorPicker y un input tipo range para cambiar el grosor de trazo.

ColorPicker.jsx
- Permite seleccionar el color del pincel.
- Estilizado con bordes redondeados y sombra.

BotonBorrar.jsx
- Botón con ícono 🧹 que ejecuta la limpieza del lienzo.
- Tiene su propio estilo (BotonBorrar.css) y está centrado verticalmente al costado derecho del lienzo.
