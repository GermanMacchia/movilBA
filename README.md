# movilBA - Sistema de Gestión de Movilidad Urbana

## Índice

- [Aplicación Desplegada](#aplicación-desplegada)
- [Credenciales de Acceso](#credenciales-de-acceso)
- [Características Principales](#características-principales)
  - [Módulos del Sistema](#módulos-del-sistema)
  - [Funcionalidades por Rol](#funcionalidades-por-rol)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Desarrollo](#instalación-y-desarrollo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Sistema de Autenticación](#sistema-de-autenticación)
- [Diseño Responsivo](#diseño-responsivo)
- [Testing](#testing)
- [Notas Importantes](#notas-importantes)

Bienvenido a **movilBA**!

Este es un pequeño **MVP (Producto Mínimo Viable)** desarrollado para presentación. Simula un sistema integral de gestión para la movilidad urbana de Buenos Aires.
La interfaz de usuario no fue delegada en otro miembro de equipo.

## Aplicación Desplegada

Puedes acceder a la aplicación desplegada en:
**[movilba.onrender.com](https://movilba.onrender.com)**

## Credenciales de Acceso

El sistema cuenta con **3 roles diferenciados** con distintos niveles de acceso:

| Usuario | Contraseña   | Rol |
|---------|--------------|-----|
| `admin` | `cualquiera` | **Administrador** - Acceso completo al sistema |
| `opera` | `cualquiera` | **Operador** - Acceso a operaciones básicas |
| `audit` | `cualquiera` | **Auditor** - Acceso a funciones de auditoría |

## Características Principales

### Módulos del Sistema
- **RUTAP** (Colectivos) - Gestión de transporte público
- **RUTAX** (Taxis) - Administración de servicios de taxi
- **RUREM** (Remises) - Control de servicios de remise
- **RUTRAMUR** (Moto/Bici Delivery) - Gestión de delivery
- **Cursos de Capacitación** - Formación y certificaciones
- **VTV** - Verificación Técnica Vehicular
- **Escolares** - Transporte escolar
- **Pesados** - Vehículos de carga
- **Verificaciones Especiales** - Controles específicos

### Funcionalidades por Rol

#### Administrador
- Acceso completo a todos los módulos
- Gestión de rendiciones y transferencias
- Control de documentaciones
- Calendarios de vencimientos
- Informes y dashboards avanzados

#### Auditor  
- Fiscalizaciones y reportes
- Configuración de sistema Plug
- Gestión documental avanzada
- Sistema de notificaciones
- Informes y dashboards

#### Operador
- Carga y gestión de documentos
- Generación de informes básicos
- Acceso a dashboards operativos

## Tecnologías Utilizadas

- **Frontend**: Angular 20+ con Vite
- **UI Framework**: PrimNG + TailwindCSS
- **Estado**: NgRx (Store + Effects)
- **Testing**: Jasmine + Karma + Cypress
- **Permisos**: ngx-permissions
- **Iconos**: PrimeIcons

## Instalación y Desarrollo

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Navegar al directorio
cd movilBA

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

### Scripts Disponibles
```bash
npm start               # Servidor de desarrollo
npm run build           # Build de producción
npm run test-build:cmd  # Corre los test y hace el build (cmd)
npm run test-build:bash # Corre los test y hace el build (bash)
npm test                # Tests unitarios y end-to-end (local)
npm run test:e2e        # Tests end-to-end con Cypress (local)
npm run e2e:open        # Abrir Cypress en modo interactivo (local)
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/     # Componentes reutilizables
│   ├── core/          # Servicios, guards, interceptors
│   │   ├── api/       # Servicios de API
│   │   ├── guards/    # Guards de autenticación
│   │   ├── store/     # NgRx store (actions, effects, reducers)
│   │   └── utils/     # Utilidades y datos mock
│   └── views/         # Páginas principales
│       ├── login/     # Página de login
│       ├── home/      # Dashboard principal
│       ├── modulos/   # Vista de módulos
│       ├── secciones/ # Vista de secciones
│       └── opciones/  # Vista de opciones
```

## Sistema de Autenticación

El sistema utiliza un mecanismo de autenticación basado en roles que:
- Valida credenciales de usuario
- Asigna permisos según el rol
- Protege rutas con guards
- Maneja el estado de autenticación con NgRx


## Testing


### Tests Unitarios - Karma-Jasmine
```bash
npm run test:unitarios
```

### Tests E2E - Cypress
```bash
npm run test:e2e
```

## Notas Importantes

- Este es un **MVP para presentación** con datos mock
- No conecta a APIs reales
- Las funcionalidades son principalmente navegacionales
- El focus está en la experiencia de usuario y la estructura del sistema

---

**¡Gracias por revisar movilBA!**

*Sistema desarrollado para demostrar capacidades en Angular, NgRx, y diseño de aplicaciones empresariales.*
