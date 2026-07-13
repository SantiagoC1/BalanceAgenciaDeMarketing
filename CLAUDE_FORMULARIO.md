# CLAUDE.md — Mejoras al formulario de diagnóstico

> Leer `CONTEXT.md` completo antes de empezar.
> Este archivo describe una sola tarea: refactorizar `DiagnosticoModal.tsx` para que el formulario sea condicional según el servicio elegido.

---

## Reglas generales del proyecto

- Estilos **solo con clases Tailwind** (v4, vía `@theme` en `index.css`). Nunca CSS custom ni clases BEM.
- Animaciones **solo con Framer Motion**. Nunca transiciones CSS manuales.
- Todas las llamadas HTTP van **exclusivamente** a través de `src/lib/api.ts`.
- Correr `npm run lint` después de cada cambio y corregir todos los errores antes de dar la tarea por terminada.
- Mobile-first: clases base sin prefijo para mobile, escalar con `md:` y `lg:`.

---

## Contexto del formulario actual

El componente `src/components/sections/DiagnosticoModal.tsx` implementa un wizard multi-paso lineal. Los pasos actuales preguntan siempre las mismas cosas independientemente del servicio que busca el usuario. Los datos se envían con `submitLead()` de `src/lib/api.ts` como un objeto plano al Google Sheet de Leads.

El hook `useConfig` trae `formConfig` desde el Sheet (opciones para selects como `comoVende`, `inversion`, etc.). Esta integración no se debe romper.

---

## Tarea — Refactorizar DiagnosticoModal con flujo condicional

### Objetivo

Agregar un **paso 0 de selección de servicio** al inicio del wizard. Según lo que elija el usuario (`web`, `marketing`, o `ambos`), los pasos siguientes cambian. Al final de cualquier rama se agrega un campo nuevo: **¿Cómo nos conociste?**

---

### Estructura de pasos por rama

#### Paso 0 — Selección de servicio (siempre, nuevo)
Pregunta: **¿Qué servicio te interesa?**
Opciones (botones/cards seleccionables, no un select):
- 🌐 **Presencia Web**
- 📱 **Marketing & Contenidos**
- ✨ **Ambos**

Este paso define qué pasos siguen. El valor se guarda en el campo `servicioRama` (`'web' | 'marketing' | 'ambos'`).

---

#### Pasos compartidos — Bloque A (siempre van, en cualquier rama)
Estos pasos van después del Paso 0, antes de los pasos específicos:

**Paso A1 — Datos de contacto**
- Nombre (`nombre`) — input texto
- Nombre de la marca (`marca`) — input texto
- Email (`email`) — input email
- Teléfono (`telefono`) — input texto

**Paso A2 — Tu negocio**
- ¿Qué productos o servicios ofrecés? (`productos`) — textarea
- ¿Cómo vendés hoy? (`comoVende`) — opciones desde `formConfig.comoVende`

---

#### Pasos específicos — Rama Web (solo si eligió "web" o "ambos")

**Paso W1 — Tu presencia digital actual**
- ¿Tenés sitio web actualmente? (`sitioActual`)
  - Opciones: `Sí, está activo` / `No tengo` / `Tengo pero está desactualizado`
- ¿Tenés identidad visual definida? (`identidadVisual`)
  - Opciones: `Sí, completa (logo, colores, tipografías)` / `Sí, parcial` / `No tengo`

**Paso W2 — El sitio que necesitás**
- ¿Qué tipo de sitio necesitás? (`tipoSitio`)
  - Opciones: `Landing page` / `Sitio institucional` / `E-commerce` / `Portfolio`
- ¿Cuál es el objetivo principal del sitio? (`objetivoSitio`)
  - Opciones: `Captar clientes` / `Vender online` / `Mostrar mi portfolio` / `Dar información de contacto`

---

#### Pasos específicos — Rama Marketing (solo si eligió "marketing" o "ambos")

**Paso M1 — Tu presencia en redes**
- ¿En qué redes estás presente hoy? (`redesActuales`)
  - Opciones multi-selección: `Instagram` / `TikTok` / `LinkedIn` / `Facebook` / `Ninguna`
  - Si selecciona "Ninguna", deseleccionar las otras automáticamente y viceversa.
- ¿Por qué querés contratar? (`porqueContratar`) — opciones desde `formConfig.porqueContratar`

**Paso M2 — Objetivos y servicio**
- ¿Cuáles son tus objetivos? (`objetivos`) — opciones desde `formConfig.objetivos` (multi-selección)
- ¿Qué servicio te interesa? (`servicioInteres`) — opciones desde `formConfig.servicioInteres`
- ¿Tenés material visual? (`materialVisual`) — opciones desde `formConfig.materialVisual`

---

#### Pasos compartidos — Bloque B (siempre van al final, en cualquier rama)

**Paso B1 — Inversión**
- ¿En qué rango de inversión mensual pensás? (`inversion`) — opciones desde `formConfig.inversion`

**Paso B2 — Cierre (nuevo)**
- ¿Cómo nos conociste? (`comoNosConociste`)
  - Opciones: `Instagram` / `Google` / `Me lo recomendaron` / `LinkedIn` / `Otro`
- Comentarios adicionales (`comentarios`) — textarea, opcional

---

### Orden completo de pasos por rama

| Paso | Web | Marketing | Ambos |
|------|-----|-----------|-------|
| 0 | Selección servicio | Selección servicio | Selección servicio |
| A1 | Datos de contacto | Datos de contacto | Datos de contacto |
| A2 | Tu negocio | Tu negocio | Tu negocio |
| W1 | Presencia digital actual | — | Presencia digital actual |
| W2 | Tipo y objetivo de sitio | — | Tipo y objetivo de sitio |
| M1 | — | Redes y por qué contratar | Redes y por qué contratar |
| M2 | — | Objetivos y servicio | Objetivos y servicio |
| B1 | Inversión | Inversión | Inversión |
| B2 | Cierre + cómo nos conociste | Cierre + cómo nos conociste | Cierre + cómo nos conociste |

---

### Tipos TypeScript

Actualizar o crear el tipo `Lead` en `src/lib/types.ts` para incluir los campos nuevos:

```ts
export type Lead = {
  // Existentes
  nombre: string
  marca: string
  email: string
  telefono: string
  productos: string
  comoVende: string
  porqueContratar?: string
  objetivos?: string
  servicioInteres?: string
  materialVisual?: string
  inversion: string
  comentarios?: string

  // Nuevos
  servicioRama: 'web' | 'marketing' | 'ambos'
  sitioActual?: string
  identidadVisual?: string
  tipoSitio?: string
  objetivoSitio?: string
  redesActuales?: string        // Array serializado como string separado por comas
  comoNosConociste: string
}
```

---

### Implementación del wizard condicional

Usar un array de pasos calculado dinámicamente según `servicioRama`. Ejemplo de estructura:

```ts
function getSteps(rama: 'web' | 'marketing' | 'ambos' | null): StepId[] {
  const base: StepId[] = ['servicio', 'contacto', 'negocio']
  const web: StepId[] = ['presenciaWeb', 'tipoSitio']
  const marketing: StepId[] = ['redes', 'objetivos']
  const cierre: StepId[] = ['inversion', 'cierre']

  if (!rama) return ['servicio']
  if (rama === 'web') return [...base, ...web, ...cierre]
  if (rama === 'marketing') return [...base, ...marketing, ...cierre]
  return [...base, ...web, ...marketing, ...cierre]
}
```

El componente mantiene un índice `currentStep` que avanza linealmente sobre este array. Cuando el usuario elige el servicio en el Paso 0, se recalcula el array de pasos y se avanza al siguiente.

---

### UI y comportamiento

- El **Paso 0** (selección de servicio) debe mostrarse como 3 cards o botones grandes y visuales, no como un select. Al hacer clic en uno queda seleccionado (borde `brand-violet`) y aparece el botón "Continuar".
- El **indicador de progreso** (si existe) debe calcularse sobre el total de pasos de la rama elegida, no sobre un total fijo.
- La **multi-selección de redes** (Paso M1) usa el mismo patrón visual que las otras opciones pero permite marcar varias. El valor se serializa como string de opciones separadas por coma antes de enviar (`"Instagram, TikTok"`).
- Si el usuario vuelve al Paso 0 y cambia de rama, limpiar los campos específicos de la rama anterior antes de continuar.
- Mantener las animaciones de transición entre pasos que ya existen (Framer Motion).

---

### Envío de datos

El objeto que se pasa a `submitLead()` debe incluir todos los campos, enviando string vacío `""` para los campos opcionales que no apliquen a la rama elegida. Esto asegura que el Google Sheet siempre reciba las mismas columnas en el mismo orden.

```ts
const payload: Lead = {
  nombre, marca, email, telefono,
  productos, comoVende,
  porqueContratar: porqueContratar ?? "",
  objetivos: objetivos ?? "",
  servicioInteres: servicioInteres ?? "",
  materialVisual: materialVisual ?? "",
  inversion,
  comentarios: comentarios ?? "",
  servicioRama,
  sitioActual: sitioActual ?? "",
  identidadVisual: identidadVisual ?? "",
  tipoSitio: tipoSitio ?? "",
  objetivoSitio: objetivoSitio ?? "",
  redesActuales: redesActuales.join(", "),
  comoNosConociste,
}
```

---

### Archivos a modificar

| Archivo | Qué cambia |
|---|---|
| `src/components/sections/DiagnosticoModal.tsx` | Refactor completo del wizard — pasos condicionales, campos nuevos, UI del paso 0 |
| `src/lib/types.ts` | Agregar campos nuevos al tipo `Lead` |

### Archivos a leer antes de modificar (no tocar)

| Archivo | Por qué leerlo |
|---|---|
| `src/hooks/useConfig.ts` | Entender qué trae `formConfig` y cómo se tipan sus opciones |
| `src/lib/api.ts` | Ver la firma actual de `submitLead()` y asegurarse de no romperla |
| `src/index.css` | Confirmar variables de color disponibles (`brand-violet`, `brand-green`, etc.) |

---

### Criterio de éxito

- [ ] El modal abre siempre en el Paso 0 (selección de servicio).
- [ ] Elegir "Web" muestra solo los pasos de web + compartidos.
- [ ] Elegir "Marketing" muestra solo los pasos de marketing + compartidos.
- [ ] Elegir "Ambos" muestra todos los pasos.
- [ ] La multi-selección de redes funciona correctamente, incluyendo la lógica de "Ninguna".
- [ ] El campo "¿Cómo nos conociste?" aparece siempre en el último paso.
- [ ] El payload enviado a `submitLead()` incluye todos los campos nuevos.
- [ ] No hay regresión en el flujo existente (validaciones, animaciones, cierre del modal).
- [ ] `npm run lint` pasa sin errores.
- [ ] `npm run build` pasa sin errores de TypeScript.
