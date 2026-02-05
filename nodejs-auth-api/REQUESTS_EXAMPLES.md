# Ejemplos de Requests HTTP

Esta guía contiene ejemplos detallados de todos los endpoints disponibles en la API.

---

## 🔐 AUTENTICACIÓN

### 1. Registrar nuevo usuario

**Endpoint:** `POST /api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "María García",
  "email": "maria@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "_id": "65abc123def456789",
    "name": "María García",
    "email": "maria@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJjMTIzZGVmNDU2Nzg5IiwiaWF0IjoxNjk1MTIzNDU2LCJleHAiOjE2OTU3MjgyNTZ9.abcd1234efgh5678"
  }
}
```

**Errores posibles:**
```json
// 400 - Campos faltantes
{
  "success": false,
  "message": "Por favor proporciona nombre, email y contraseña"
}

// 400 - Email duplicado
{
  "success": false,
  "message": "El email ya está registrado"
}

// 400 - Validación fallida
{
  "success": false,
  "message": [
    "El nombre no puede exceder 50 caracteres",
    "Por favor ingresa un email válido"
  ]
}
```

---

### 2. Iniciar sesión

**Endpoint:** `POST /api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "maria@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "_id": "65abc123def456789",
    "name": "María García",
    "email": "maria@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWJjMTIzZGVmNDU2Nzg5IiwiaWF0IjoxNjk1MTIzNDU2LCJleHAiOjE2OTU3MjgyNTZ9.abcd1234efgh5678"
  }
}
```

**Errores posibles:**
```json
// 400 - Campos faltantes
{
  "success": false,
  "message": "Por favor proporciona email y contraseña"
}

// 401 - Credenciales inválidas
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

### 3. Obtener perfil del usuario actual

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123def456789",
    "name": "María García",
    "email": "maria@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 📝 TAREAS (Todas requieren autenticación)

### 4. Obtener todas las tareas del usuario

**Endpoint:** `GET /api/tasks`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "65def789abc123456",
      "title": "Completar documentación",
      "description": "Escribir la documentación técnica del proyecto",
      "status": "in-progress",
      "priority": "high",
      "user": "65abc123def456789",
      "createdAt": "2024-01-16T08:00:00.000Z",
      "updatedAt": "2024-01-16T09:30:00.000Z"
    },
    {
      "_id": "65def789abc123457",
      "title": "Revisar código",
      "description": "Hacer code review del PR #45",
      "status": "pending",
      "priority": "medium",
      "user": "65abc123def456789",
      "createdAt": "2024-01-15T14:20:00.000Z",
      "updatedAt": "2024-01-15T14:20:00.000Z"
    },
    {
      "_id": "65def789abc123458",
      "title": "Deploy a producción",
      "description": "Subir la última versión al servidor",
      "status": "completed",
      "priority": "high",
      "user": "65abc123def456789",
      "createdAt": "2024-01-14T11:00:00.000Z",
      "updatedAt": "2024-01-15T16:45:00.000Z"
    }
  ]
}
```

---

### 5. Obtener una tarea específica

**Endpoint:** `GET /api/tasks/:id`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Ejemplo:** `GET /api/tasks/65def789abc123456`

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65def789abc123456",
    "title": "Completar documentación",
    "description": "Escribir la documentación técnica del proyecto",
    "status": "in-progress",
    "priority": "high",
    "user": "65abc123def456789",
    "createdAt": "2024-01-16T08:00:00.000Z",
    "updatedAt": "2024-01-16T09:30:00.000Z"
  }
}
```

**Errores posibles:**
```json
// 404 - Tarea no encontrada
{
  "success": false,
  "message": "Tarea no encontrada"
}

// 403 - No pertenece al usuario
{
  "success": false,
  "message": "No autorizado para acceder a esta tarea"
}
```

---

### 6. Crear nueva tarea

**Endpoint:** `POST /api/tasks`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body (JSON) - Mínimo:**
```json
{
  "title": "Nueva tarea importante"
}
```

**Body (JSON) - Completo:**
```json
{
  "title": "Implementar búsqueda avanzada",
  "description": "Agregar filtros y ordenamiento en la búsqueda de productos",
  "status": "pending",
  "priority": "high"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Tarea creada exitosamente",
  "data": {
    "_id": "65def789abc123459",
    "title": "Implementar búsqueda avanzada",
    "description": "Agregar filtros y ordenamiento en la búsqueda de productos",
    "status": "pending",
    "priority": "high",
    "user": "65abc123def456789",
    "createdAt": "2024-01-16T10:15:00.000Z",
    "updatedAt": "2024-01-16T10:15:00.000Z"
  }
}
```

**Valores permitidos:**
- `status`: 'pending', 'in-progress', 'completed' (default: 'pending')
- `priority`: 'low', 'medium', 'high' (default: 'medium')

**Errores posibles:**
```json
// 400 - Título requerido
{
  "success": false,
  "message": ["El título es obligatorio"]
}

// 400 - Título muy largo
{
  "success": false,
  "message": ["El título no puede exceder 100 caracteres"]
}
```

---

### 7. Actualizar tarea

**Endpoint:** `PATCH /api/tasks/:id`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Ejemplo:** `PATCH /api/tasks/65def789abc123456`

**Body (JSON) - Actualizar solo status:**
```json
{
  "status": "completed"
}
```

**Body (JSON) - Actualizar múltiples campos:**
```json
{
  "title": "Documentación completada",
  "description": "Se ha terminado toda la documentación técnica",
  "status": "completed",
  "priority": "medium"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tarea actualizada exitosamente",
  "data": {
    "_id": "65def789abc123456",
    "title": "Documentación completada",
    "description": "Se ha terminado toda la documentación técnica",
    "status": "completed",
    "priority": "medium",
    "user": "65abc123def456789",
    "createdAt": "2024-01-16T08:00:00.000Z",
    "updatedAt": "2024-01-16T11:20:00.000Z"
  }
}
```

**Errores posibles:**
```json
// 404 - Tarea no encontrada
{
  "success": false,
  "message": "Tarea no encontrada"
}

// 403 - No pertenece al usuario
{
  "success": false,
  "message": "No autorizado para actualizar esta tarea"
}
```

---

### 8. Eliminar tarea

**Endpoint:** `DELETE /api/tasks/:id`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Ejemplo:** `DELETE /api/tasks/65def789abc123456`

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tarea eliminada exitosamente",
  "data": {}
}
```

**Errores posibles:**
```json
// 404 - Tarea no encontrada
{
  "success": false,
  "message": "Tarea no encontrada"
}

// 403 - No pertenece al usuario
{
  "success": false,
  "message": "No autorizado para eliminar esta tarea"
}
```

---

## ⚠️ Errores de autenticación

Estos errores pueden ocurrir en cualquier endpoint protegido:

```json
// 401 - Sin token
{
  "success": false,
  "message": "No autorizado, token no proporcionado"
}

// 401 - Token inválido o expirado
{
  "success": false,
  "message": "No autorizado, token inválido o expirado"
}

// 401 - Usuario no encontrado
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

---

## 📋 Colección para Postman/Insomnia

### Variables de entorno sugeridas:

```json
{
  "base_url": "http://localhost:5000",
  "token": ""
}
```

### Flujo de prueba recomendado:

1. **Registrar usuario** → Guardar el token
2. **Login** → Verificar que devuelve el mismo token o uno nuevo
3. **Obtener perfil** → Usar el token guardado
4. **Crear tarea** → Usar el token guardado
5. **Listar tareas** → Verificar que aparece la tarea creada
6. **Actualizar tarea** → Cambiar status o prioridad
7. **Eliminar tarea** → Verificar que se elimina correctamente

---

## 🔍 Tips para testing

1. **Guarda el token**: Después de registrarte o hacer login, copia el token y úsalo en todos los requests protegidos.

2. **Formato del header**: 
   ```
   Authorization: Bearer <tu_token_completo>
   ```
   (Nota el espacio después de "Bearer")

3. **Prueba con diferentes usuarios**: Crea varios usuarios y verifica que cada uno solo ve sus propias tareas.

4. **Valida las restricciones**: Intenta actualizar/eliminar tareas de otros usuarios para verificar que el sistema lo impide.

5. **Prueba los límites**: Intenta enviar títulos muy largos, emails inválidos, etc., para verificar las validaciones.

---

## 📞 Contacto

Si encuentras algún problema o tienes preguntas, no dudes en abrir un issue en el repositorio.
