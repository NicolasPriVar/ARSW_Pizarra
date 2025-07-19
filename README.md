# 🖌️ Pizarra Interactiva con React

Este proyecto es una aplicación web que permite al usuario dibujar sobre una pizarra, cambiar el color del trazo, ajustar el grosor del pincel, y borrar completamente el lienzo. La interfaz es amigable, responsiva y está construida completamente con React.js usando componentes funcionales y hooks.

---

## 🚀 Tecnologías Usadas

### 🔹 Frontend (React)
- React 18
- HTML5 + CSS3
- Canvas API
- Google OAuth2 Login (con `@react-oauth/google`)
- Despliegue: **Azure**

### 🔹 Backend (Spring Boot)
- Spring Web
- Spring Security (OAuth2 Client)
- Spring Boot Devtools
- SonarQube + JaCoCo para análisis de calidad y cobertura
- Variables sensibles gestionadas con `application.properties` y variables de entorno
- Despliegue: **Azure**
---

## 🧠 ¿Qué es React?

**React** es una biblioteca de JavaScript desarrollada por Facebook para construir interfaces de usuario. Su enfoque está basado en componentes, lo que permite dividir una aplicación en piezas reutilizables y modulares.

### Principales características:
- **Declarativo**: describe qué debe mostrarse, no cómo.
- **Componentes**: unidades reutilizables con lógica y vista.
- **Virtual DOM**: actualizaciones eficientes y rápidas.
- **Hooks**: funciones como `useState` o `useEffect` permiten manejar estado y efectos secundarios sin clases.

React facilita el desarrollo de interfaces complejas mediante la composición de componentes simples y manejables.

## ✅ JaCoCo (Java Code Coverage)

**JaCoCo (Java Code Coverage)** es una herramienta que permite medir la cobertura de código en proyectos Java. Su objetivo es indicar qué partes del código han sido ejecutadas durante la ejecución de pruebas automatizadas. Fue desarrollado como un reemplazo moderno de Cobertura y EMMA.

### Características principales
- Compatible con JDK 1.5 o superior.
- Puede integrarse con herramientas como Maven, Gradle, Ant o Eclipse.
- Soporta cobertura de líneas, ramas, instrucciones y métodos.

### Importancia
JaCoCo permite a los desarrolladores identificar áreas no testeadas del código, mejorando así la calidad y confiabilidad del software. No garantiza que el código esté libre de errores, pero sí que al menos fue ejecutado durante los tests.

## ✅ SonarQube

**SonarQube** es una plataforma de código abierto para el análisis continuo de la calidad del código. Evalúa automáticamente el código fuente para detectar errores, vulnerabilidades de seguridad, duplicaciones, problemas de estilo, cobertura de pruebas y más.

### Características clave
- Soporta múltiples lenguajes de programación (Java, JavaScript, Python, etc.).
- Integración con herramientas CI/CD (GitHub Actions, Jenkins, GitLab CI, etc.).
- Proporciona dashboards y métricas detalladas de calidad del código.
- Clasifica problemas en bugs, code smells y vulnerabilidades.

### Importancia
Permite mantener una base de código saludable, facilita el mantenimiento y previene la deuda técnica. Es especialmente útil en equipos grandes donde múltiples personas colaboran en el mismo código base.

## ✅ Docker

**Docker** es una plataforma que permite crear, distribuir y ejecutar aplicaciones mediante contenedores. Los contenedores encapsulan la aplicación junto con sus dependencias, asegurando que se comporten de la misma forma en cualquier entorno.

### Componentes principales
- **Imagen**: una plantilla de solo lectura que define qué contiene un contenedor (código, dependencias, etc.).
- **Contenedor**: instancia ejecutable de una imagen.
- **Dockerfile**: archivo de texto que contiene instrucciones para construir una imagen.
- **Docker Hub**: repositorio de imágenes de Docker.

### Ventajas
- Portabilidad entre entornos (desarrollo, pruebas, producción).
- Reducción de problemas de "works on my machine".
- Aislamiento de procesos y dependencias.
  
---

## 🔐 Seguridad

### 🔸 Variables sensibles usadas:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SPRING_APPLICATION_NAME`
- `SONAR_TOKEN`

---

## ⚙️ ¿Cómo funciona cada componente?

**FRONTEND**

### 📁 `index.js`
**Punto de entrada principal** de la aplicación React. Renderiza el componente `<App />` en el DOM.

---

### 📁 `App.js`
Componente raíz que controla:
- Inicio de sesión del usuario.
- Estados globales como el color del trazo y su grosor.
- Renderiza condicionalmente:
  - `<LoginPage />` si el usuario no ha iniciado sesión.
  - `<CanvasBoard />`, `<Toolbar />` y `<Chat />` cuando ya inició sesión.

---

### 📁 `Toolbar.js`
Barra de herramientas que permite:
- Seleccionar el color del trazo (`<ColorPicker />`).
- Elegir el grosor de la línea mediante un `input range`.

---

### 📁 `ColorPicker.js`
Selector de color basado en `<input type="color">`. Cambia el color de dibujo en la pizarra.

---

### 📁 `LoginPage.js`
Pantalla de inicio de sesión con Google:
- Usa `@react-oauth/google` y `jwt-decode` para obtener los datos del usuario.
- Llama a `onLoginSuccess()` al autenticarse correctamente.

---

### 📁 `CanvasBoard.js`
Componente principal de la pizarra:
- Usa un `<canvas>` para el dibujo.
- Se comunica en tiempo real con otros usuarios vía WebSocket (`SockJS` + `STOMP`).
- Permite:
  - Iniciar y continuar trazos.
  - Borrar la pizarra con el botón `<BotonBorrar />`.
  - Sincronización de trazos con todos los usuarios conectados.
- Guarda trazos temporalmente en `localStorage`.

---

### 📁 `Chat.js`
Sistema de chat en tiempo real:
- Recibe y publica mensajes vía WebSocket (`/topic/chat` y `/app/chat`).
- Permite que los usuarios conectados conversen en vivo.
- Usa el nombre del usuario autenticado para firmar cada mensaje.

---

### 📁 `BotonBorrar.js`
Botón que permite borrar el contenido de la pizarra:
- Ejecuta `onClear()`, que limpia el lienzo local y lo sincroniza vía WebSocket con todos los usuarios.

---

### 📁 `mensajes.js`
Utilidades para el sistema de dibujo:
- Define constantes de eventos (`BEGIN_PATH`, `DRAW`, `CLEAR`).
- Incluye funciones para generar mensajes JSON de eventos del lienzo.

---

**BACKEND**

### 🏁 `PizarraApplication.java`
Clase principal que arranca la aplicación Spring Boot. Contiene el método `main()`.

---

### 🧠 `CanvasController.java`
Controlador WebSocket que expone los siguientes endpoints STOMP:

- `@MessageMapping("/draw") → /topic/board`: Envía un trazo individual a todos los clientes.
- `@MessageMapping("/draw-batch")`: Envía múltiples trazos en un bucle a `/topic/board`.
- `@MessageMapping("/chat") → /topic/chat`: Difunde mensajes del chat a todos los suscriptores.

---

### 🛡️ `SecurityConfig.java`
Clase de configuración de seguridad Spring Security:

- Permite el acceso sin autenticación a rutas como `/`, `/login`, `/error`, y `/ws/**`.
- Configura autenticación con **Google OAuth2**.
- Configura **CORS** para permitir solicitudes desde el frontend (`http://localhost:3000`).
- Desactiva CSRF para facilitar conexiones WebSocket desde el frontend.

---

### 🔐 `JwtHandshakeInterceptor.java`
Interceptor de WebSocket que:

- Extrae el **JWT** de la URL al momento del handshake (`?token=...`).
- Parsea el token y obtiene el **email del usuario**.
- Almacena el email en los atributos de la sesión WebSocket.

Si el token es inválido o no está presente, el handshake es rechazado.

---

### 🔌 `WebSocketConfig.java`
Configura el soporte para WebSocket y STOMP:

- Define el endpoint `/ws` (con soporte para SockJS).
- Aplica el `JwtHandshakeInterceptor` en el endpoint WebSocket.
- Configura los prefijos del broker:
  - Mensajes enviados desde el cliente usan `/app/...`.
  - Mensajes emitidos desde el servidor se publican en `/topic/...`.

---

## Diagrama de clases

<img width="788" height="319" alt="image" src="https://github.com/user-attachments/assets/d3ca76be-2ec0-4fb0-86f1-8c3176fb6598" />


---

## 📸Capturas de pantalla

- Solicitud de inicio de sesión  
  <img width="613" height="365" alt="image" src="https://github.com/user-attachments/assets/5a06d57a-d8bc-4ab3-a69c-5584ed02f7e9" />  
- Autenticación con Google  
  <img width="613" alt="image" src="https://github.com/user-attachments/assets/35eb221f-9005-430a-9d4c-5c73d52221fe" />  
- Vista al momento de ingresar a la pizarra  
  <img width="613" alt="image" src="https://github.com/user-attachments/assets/b8b7e1f5-0981-47d8-a50a-cd7b676907e2" />  
- Correcta sincronización de usuarios diferentes en la pizarra, se ve el chat en tiempo real y los dibujos  
  <img width="613" alt="image" src="https://github.com/user-attachments/assets/217e4169-fda4-4b7c-ba32-0713143a2a04" />  
- Covertura con Jacoco  
  <img width="613" alt="image" src="https://github.com/user-attachments/assets/94f73965-eae3-4647-8384-abeb9af41e10" />  
- Revisión con SonarQube  
  <img width="613" alt="image" src="https://github.com/user-attachments/assets/7fcbd958-c999-4131-8778-a428c8b7ebbe" />  
- Contenedor Docker par SonarQube  
  <img width="613" alt="image" src="https://github.com/user-attachments/assets/87a68414-0a79-4ee4-893a-1f413825fb74" />




