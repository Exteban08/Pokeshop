# Poke-shop

Poke-Shop es una tienda en línea que permite a los usuarios buscar, ver detalles, guardarlos en favoritos, filtrar por tipos y comprar Pokémon.

## Tecnologías utilizadas

- **React** para manejo de componentes y construcción de estos.
- **React Router** para navegación entre páginas.
- **TypeScript** para manejo de tipos de datos entre componentes y sus estados.
- **Context API + useReducer** como solución de manejo de estado:
  Principalemente se optó por esta opción ya que son una herramienta y hook nativos de React y
  por lo tanto nos evita instalar más dependencias, así como un manejo de estado más dinámico
  al hacer actualizaciones que dependen del estado anterior.
- **Tailwind CSS** para diseño de la tienda:
  Hoy en día es un excelente framework de CSS para diseño de interfaces modernas ya que
  trabaja de manera rápida y eficiente, así como también ayuda a manteneniendo un código
  más limpio y reutilizable.
- **clsx** para manejo de clases Tailwind CSS con condicionales:
  Esta pequeña librería permite usar una sintaxis más legible de aquellas clases de Tailwind
  con condiciones.
- **Vite** como servidor de desarrollo:
  Vite es una herramienta diseñada para ser rápida, eficiente y muy fácil de ejecutar.
- **Axios** como alternativa para solicitudes HTTP:
  A diferencia de `fetch`, axios requiere menos configuración para hacer solicitudes y las
  maneja de manera más sencilla y eficiente.
  Se basa principalmente en `Promises` lo que ayuda a manejar respuestas asíncronas con
  más rapidez.
- **Vitest** para tests unitarios:
  Ya que la aplicación se inició con Vite se optó por utilizar este framework por el soporte
  que tiene con este bundle y con typescript ya que no necesita configuración extra.
- **Testing Library (React y Jest-DOM)** para tests de componentes y flujos críticos:
  Estas librerías son bastante compatibles con las tecnologías que estamos utilizando por lo
  tanto las utilizamos tanto para las pruebas de usuario como para las de componentes.

# Instalación y ejecución

## 1. Clona el repositorio

```js
git clone https://github.com/Exteban08/Pokeshop.git
cd poke-shop
```

## 2. Instala las dependencias

```js
npm install
```

## 3. Inicia el servidor de desarrollo

```js
npm run dev
```

Luego, abre '[http://localhost:5173/](http://localhost:5173/)' en tu navegador.

# Pruebas

## Ejecuta los test con:

```js
npm run test
```

# Próximas mejoras

- Búsqueda y filtros avanzados (por tipo, nombre, habilidades, etc.).
- Paginación para mostrar más Pokémon.
- Sistema de autenticación e integración de base de datos para no perder datos de usuarios.

`By Esteban González`
