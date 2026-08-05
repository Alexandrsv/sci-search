

# Interfaz de búsqueda para artículos científicos (sci-search)

Este proyecto es una aplicación web para buscar artículos científicos.

## Tecnologías

- [Next.js](https://nextjs.org/) - Framework para aplicaciones de React con renderizado del lado del servidor.
- [tRPC](https://trpc.io/) - Para crear API tipados sin necesidad de generación de código.
- [Prisma](https://prisma.io/) - ORM para interactuar con la base de datos.
- [PostgreSQL](https://www.postgresql.org/) - Base de datos relacional.
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS para maquetación rápida.
- [Zustand](https://zustand-demo.pmnd.rs/) - Gestión de estado simple y rápida.
- [Biome](https://biomejs.dev/) - Formateador y linter para código.

## Cómo empezar

### 1. Instalación de dependencias

```bash
npm install
```

### 2. Configuración de variables de entorno

Cree un archivo `.env` en la raíz del proyecto, copiando el contenido de `.env.example`. Este archivo contiene todas las variables de entorno necesarias, incluida la configuración de la base de datos (PostgreSQL), los datos de conexión (por ejemplo, `DATABASE_URL` y `DATABASE_URL_DOCKER`), así como variables públicas para el frontend, como `NEXT_PUBLIC_YANDEX_METRIKA_ID`.

Asegúrese de reemplazar los valores de marcador con los suyos propios, especialmente para datos confidenciales como contraseñas.

```bash
cp .env.example .env
```

Ejemplo de `.env` (consulte `.env.example` para obtener información completa):
```
APP_NAME="sci-search"
# ... otras variables
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXT_PUBLIC_YANDEX_METRIKA_ID="YOUR_YANDEX_METRIKA_ID"
```

### 3. Aplicación de migraciones de base de datos

Ejecute las migraciones para crear las tablas necesarias en la base de datos.

```bash
npm run db:generate
```

### 4. Ejecución de la aplicación

Inicie el servidor de desarrollo.

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo.
- `npm run build` - Compila la versión de producción de la aplicación.
- `npm run start` - Inicia la compilación de producción.
- `npm run check` - Verifica el código con Biome.
- `npm run db:generate` - Aplica las migraciones de la base de datos.
- `npm run db:studio` - Inicia Prisma Studio para visualizar y editar los datos.
