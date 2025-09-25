# Convención de ramas y flujo de trabajo en Git

Este documento describe una convención clara y práctica para el uso de ramas en Git, orientada a equipos de desarrollo con integrantes de nivel **junior a mid**. También se detalla un flujo de trabajo organizado para el manejo de cambios, commits y Pull Requests.

---

## ✨ Convención para nombres de ramas

Usamos la siguiente estructura para nombrar ramas:

```
[tipo-de-rama]/[componente]-[accion]-[autor]
```

### Ejemplo

```
feature/service-createUser-nico
```

### Partes del nombre:

- `feature`: indica el tipo de rama. Otros posibles valores:
  - `bugfix`: para corregir errores.
- `service`: parte del sistema donde se realiza el cambio (puede ser `controller`, `api`, `frontend`, etc.).
- `createUser`: nombre de la funcionalidad o tarea.
- `nico`: identificador del desarrollador que creó la rama.

Esta convención permite que todos los miembros del equipo entiendan fácilmente **qué se está haciendo**, **dónde** y **quién lo hace**.

---

## 🚀 Flujo de trabajo con ramas y commits

### 1. Partimos desde la rama `developer`

Antes de empezar cualquier funcionalidad nueva:

```bash
git checkout developer
git pull origin developer
```

### 2. Creamos una nueva rama con la convención

```bash
git checkout -b feature/service-createUser-nico
```

### 3. Trabajamos en la funcionalidad

Desarrollamos la tarea correspondiente dentro de esta nueva rama.

### 4. Subimos avances, ya esté completa o no

#### Si no terminamos de trabajar (por ejemplo: se nos hizo tarde)

```bash
git add .
git commit -m "feat: service-createUser - inicia creación de funcionalidad"
git push origin feature/service-createUser-nico
```

**Importante:** No se debe crear un Pull Request todavía.

#### Si terminamos de trabajar en la funcionalidad

```bash
git add .
git commit -m "feat: service-createUser finalizada"
git push origin feature/service-createUser-nico
```


Otros prefijos comunes incluyen:
- `fix:` para correcciones de errores.
- `ref:` para reestructuraciones sin cambiar el comportamiento.
- `docs:` para cambios en la documentación.
- `test:` para pruebas.
- `chore:` para tareas menores o de mantenimiento.

### 5. Creamos un Pull Request (PR)

Un **Pull Request (PR)** es una solicitud para fusionar nuestra rama con la rama `developer`. Permite revisar el código antes de integrarlo.

- Vamos a GitHub.
- Elegimos nuestra rama (`feature/service-createUser-nico`).
- Iniciamos un nuevo PR contra la rama `developer`.
- Le damos un nombre claro y agregamos una descripción breve.
- **NO realizamos el merge nosotros mismos.**

> Un compañero debe aprobar y hacer el merge. No vamos a revisar en detalle, pero **seguimos esta práctica para acostumbrarnos a un flujo ordenado y profesional.**

---

## 📅 Ejemplo de uso diario

**Escenario:** Hoy trabajaste en la creación de un nuevo servicio para registrar usuarios.

1. `git checkout developer && git pull`
2. `git checkout -b feature/service-createUser-nico`
3. Trabajás algunas horas, pero no terminás.
4. Ejecutás:
   ```bash
   git add .
   git commit -m "feat: service-createUser - lógica inicial de registro"
   git push origin feature/service-createUser-nico
   ```
5. **NO creás Pull Request.**
6. Al día siguiente, completás el código y hacés:
   ```bash
   git add .
   git commit -m "feat: service-createUser finalizada"
   git push origin feature/service-createUser-nico
   ```
7. Vas a GitHub y creás el Pull Request contra `developer`.
8. Esperás a que un compañero lo apruebe y haga el merge.

---

## ✅ Beneficios de este flujo

- Claridad en el propósito de cada rama y commit.
- Facilita la colaboración y seguimiento entre compañeros.
- Establece una práctica profesional que escala bien con el tiempo.

---

Ante cualquier duda, consultá con un compañero del equipo. Este documento busca unificar criterios para que el trabajo en equipo sea más fluido y profesional.

