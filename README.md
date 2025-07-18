# GourmetSpot - Aplicación de Reservas de Restaurantes

Una aplicación web sofisticada y elegante para la gestión de reservas de restaurantes, desarrollada con Angular 19 y Material Design. Diseñada con una estética cálida, sofisticada y atemporal inspirada en la experiencia culinaria de alta gama.

## 🚀 Características

- **Diseño Sofisticado**: Interfaz elegante con una paleta de colores inspirada en la alta gastronomía
- **Responsive**: Completamente adaptable a dispositivos móviles
- **Autenticación**: Sistema de login y registro de usuarios con experiencia visual mejorada
- **Navegación Intuitiva**: Menú de navegación claro y accesible
- **Gestión de Restaurantes**: Explorar y filtrar restaurantes por distrito
- **Reservas**: Sistema de reservas con integración de pagos PayPal
- **Perfil de Usuario**: Gestión de información personal

## 🎨 Guía de Estilo

### Paleta de Colores
- **Principal**: #6a3d2a (Marrón café elegante)
- **Secundario**: #d4af37 (Dorado sofisticado)
- **Acento**: #7d8c5c (Verde oliva)
- **Oscuro**: #2c2824 (Marrón oscuro casi negro)
- **Claro**: #f9f6f2 (Crema suave)
- **Texto**: #463832 (Marrón texto)
- **Fondo**: #f5f2ed (Beige claro)

### Tipografía
- **Títulos**: Cormorant Garamond (serif)
- **Cuerpo**: Lato (sans-serif)

### Elementos de Diseño
- Bordes redondeados suaves (4px)
- Efectos de hover sutiles
- Sombras ligeras para crear profundidad
- Iconografía limpia y minimalista

## 🛠️ Tecnologías Utilizadas

- **Angular 19.2.15**: Framework principal
- **Angular Material 19.2.0**: Componentes de interfaz
- **TypeScript**: Lenguaje de programación
- **SCSS**: Preprocesador de CSS
- **RxJS**: Programación reactiva
- **Standalone Components**: Arquitectura moderna de Angular

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

### Pasos de instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd restaurant-reservation-app
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar la API:
   - Editar la URL base en los servicios ubicados en `src/app/services/`
   - Cambiar `http://localhost:8080/api` por la URL de tu API

4. Ejecutar la aplicación:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── home/
│   │   ├── profile/
│   │   ├── restaurants/
│   │   │   ├── restaurant-list/
│   │   │   └── restaurant-detail/
│   │   └── reservations/
│   │       ├── reservation-list/
│   │       └── reservation-detail/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── restaurant.service.ts
│   │   └── reservation.service.ts
│   ├── models/
│   │   └── interfaces.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   └── material.config.ts
├── assets/
└── styles.scss
```

## 🎨 Diseño y Tema

La aplicación utiliza un esquema de colores moderno y atractivo:

- **Primario**: #ff6b6b (Coral)
- **Secundario**: #4ecdc4 (Turquesa)
- **Acento**: #45b7d1 (Azul cielo)
- **Oscuro**: #2c3e50 (Azul oscuro)
- **Fondo**: #f8f9fa (Gris claro)

## 📱 Características Responsive

- Diseño adaptativo para dispositivos móviles
- Navegación optimizada para pantallas táctiles
- Componentes que se ajustan automáticamente al tamaño de pantalla
- Menú de navegación colapsable en dispositivos móviles

## 🔐 Autenticación

La aplicación incluye un sistema completo de autenticación:

- **Registro**: Crear nueva cuenta de usuario
- **Login**: Iniciar sesión con credenciales
- **Protección de rutas**: Acceso restringido a funciones autenticadas
- **Gestión de tokens**: Almacenamiento seguro de tokens JWT
- **Logout**: Cierre de sesión con limpieza de datos

## 🍽️ Funcionalidades de Restaurantes

- **Lista de restaurantes**: Visualización paginada con filtros
- **Filtro por distrito**: Buscar restaurantes por ubicación
- **Información detallada**: Dirección, teléfono, precio y capacidad
- **Navegación intuitiva**: Fácil acceso a detalles y reservas

## 📅 Sistema de Reservas

- **Crear reservas**: Seleccionar fecha, número de personas y notas
- **Gestionar reservas**: Ver historial y estado de reservas
- **Integración de pagos**: Procesamiento seguro con PayPal
- **Estados de reserva**: PENDING, PAID, CANCELLED

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm start                # Ejecutar servidor de desarrollo
npm run build           # Compilar para producción
npm run watch           # Compilar en modo observación
npm test               # Ejecutar pruebas unitarias

# Análisis
npm run lint           # Verificar calidad de código
npm run analyze        # Analizar tamaño del bundle
```

## 🌐 API Integration

La aplicación está diseñada para integrarse con una API REST que proporciona:

### Endpoints principales:

- `POST /auth/sign-up` - Registro de usuarios
- `POST /auth/sign-in` - Inicio de sesión
- `GET /districts` - Obtener distritos
- `GET /restaurants/page` - Listar restaurantes
- `GET /restaurants/page/district` - Filtrar por distrito
- `GET /restaurants/{id}` - Obtener restaurante específico
- `POST /reservations` - Crear reserva
- `GET /reservations/my-reservations` - Obtener mis reservas
- `GET /reservations/{id}` - Obtener reserva específica
- `POST /checkout/paypal/create` - Crear orden de pago
- `POST /checkout/paypal/capture` - Capturar pago

## 🔧 Configuración

### Variables de entorno

Crear un archivo `environment.ts` para configurar:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### Personalización del tema

Editar `src/styles.scss` para personalizar colores y estilos globales.

## 🚦 Estado del Proyecto

### ✅ Funcionalidades Completadas

- [x] Autenticación (login/register)
- [x] Navegación responsive
- [x] Lista de restaurantes con filtros
- [x] Perfil de usuario
- [x] Diseño moderno con Material Design
- [x] Estructura de servicios para API
- [x] Guards de autenticación
- [x] Componentes standalone

### 🔄 En Desarrollo

- [ ] Detalles de restaurante con reservas
- [ ] Gestión completa de reservas
- [ ] Integración de pagos PayPal
- [ ] Edición de perfil de usuario
- [ ] Notificaciones push
- [ ] Sistema de reseñas

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autor

Desarrollado con ❤️ por el equipo de FlavorHub

---

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda, no dudes en:

- Abrir un issue en el repositorio
- Contactar al equipo de desarrollo
- Revisar la documentación de la API

¡Disfruta explorando los mejores restaurantes con FlavorHub! 🍽️
