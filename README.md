# ExRE — Explorador de Recursos de Estudio

Aplicación Angular + Capacitor para Android. Consulta recursos de aprendizaje, filtra, marca favoritos y revisa el progreso. Datos locales (sin servidor).

## Requisitos

- Node.js 20+
- Android Studio (SDK + emulador o dispositivo)
- JDK 17+

## Instalación y ejecución

```bash
npm install
npm run build
npx cap sync
npx cap run android
```

### Solo web (desarrollo)

```bash
npm start
```

Abre `http://localhost:4200`.

### Abrir el proyecto Android en Android Studio

```bash
npm run build
npx cap sync
npx cap open android
```

## Estructura

| Ruta | Contenido |
|------|-----------|
| `src/app/data/recursos.ts` | Recursos de estudio |
| `src/app/services/state.service.ts` | Estado en memoria |
| `src/app/services/lifecycle.service.ts` | Ciclo de vida con `@capacitor/app` |
| `src/app/pages/*` | Inicio, Catálogo, Galería, Detalle, Favoritos, Progreso |
