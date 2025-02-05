# Poke-Shop

Poke-Shop es una tienda en línea que permite a los usuarios buscar, ver detalles, guardar en favoritos, filtrar por tipos y comprar Pokémon.

## Tecnologías utilizadas

- **React** para la construcción y manejo de componentes.
- **React Router** para la navegación entre páginas.
- **TypeScript** para el tipado seguro y la gestión de estados en los componentes.
- **Context API + useReducer** para la gestión del estado global:
  - Se optó por esta solución debido a que son herramientas nativas de React, evitando la instalación de dependencias adicionales.
  - Facilita un manejo de estado eficiente, especialmente en actualizaciones dependientes del estado anterior.
- **Tailwind CSS** para el diseño de la interfaz:
  - Un framework moderno que permite un desarrollo rápido y eficiente.
  - Facilita la escritura de código limpio y reutilizable.
- **clsx** para la gestión de clases de Tailwind CSS con condicionales:
  - Permite una sintaxis más legible para el manejo dinámico de clases.
- **Vite** como servidor de desarrollo:
  - Diseñado para ser rápido, eficiente y fácil de configurar.
- **Axios** para solicitudes HTTP:
  - Requiere menos configuración en comparación con `fetch`.
  - Manejo sencillo y eficiente de solicitudes asíncronas basado en `Promises`.
- **Vitest** para pruebas unitarias:
  - Se eligió por su compatibilidad con Vite y TypeScript sin necesidad de configuración adicional.
- **Testing Library (React y Jest-DOM)** para pruebas de componentes y flujos críticos:
  - Compatible con las tecnologías utilizadas, facilitando la automatización de pruebas de usuario y componentes.
- **Railway** como plataforma de despliegue:
  - Permite un despliegue rápido y sin configuraciones complejas.
  - Soporta entornos modernos como Vite y Node.js.

## Instalación y ejecución

### 1. Clonar el repositorio

```sh
git clone https://github.com/Exteban08/Pokeshop.git
cd poke-shop
```

### 2. Instalar dependencias

```sh
npm install
```

### 3. Iniciar el servidor de desarrollo

```sh
npm run dev
```

Abrir [http://localhost:5173/](http://localhost:5173/) en el navegador.

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```sh
npm run test
```

## Próximas mejoras

- Implementación de búsqueda y filtros avanzados (por tipo, nombre, habilidades, etc.).
- Funcionamiento de carrito de compras en toda la aplicación, por ejemplo que desde detalles
  permita agregar al carrito y este se abra en esa pantalla.
- Sistema de autenticación e integración de base de datos para almacenar datos de usuarios.
- Implementación de lógica de checkout, así como sus tests.

---

**Autor:** Esteban González
