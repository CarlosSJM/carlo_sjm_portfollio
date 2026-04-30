# Spec-Kit: Spec-Driven Development

## Que es

Spec-kit (GitHub) implementa **Spec-Driven Development (SDD)**: las especificaciones no son documentos desechables, sino artefactos ejecutables que generan implementaciones via agentes IA. Transforma "vibe coding" en resultados predecibles y de alta calidad.

## Instalacion

```bash
# Requiere uv (Python package manager)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Inicializar en proyecto existente para Claude Code
specify init . --ai claude
```

Esto instala:
- Skills en `.claude/skills/speckit-*`
- Templates en `.specify/templates/`
- Scripts en `.specify/scripts/`
- Constitution base en `.specify/memory/constitution.md`

## Flujo de trabajo (orden obligatorio)

```
/speckit-constitution  →  Define principios del proyecto (se hace una vez)
        ↓
/speckit-specify       →  Crea especificacion baseline del feature
        ↓
/speckit-clarify       →  (opcional) Preguntas para desambiguar antes de planificar
        ↓
/speckit-plan          →  Genera plan de implementacion detallado
        ↓
/speckit-checklist     →  (opcional) Checklists de calidad post-plan
        ↓
/speckit-analyze       →  (opcional) Analisis de consistencia entre artefactos
        ↓
/speckit-tasks         →  Genera tareas accionables desde el plan
        ↓
/speckit-implement     →  Ejecuta la implementacion siguiendo tareas
        ↓
/speckit-taskstoissues →  (opcional) Convierte tareas a GitHub Issues
```

## Comandos disponibles

| Comando | Fase | Descripcion |
|---|---|---|
| `/speckit-constitution` | Fundacion | Establece principios inmutables del proyecto |
| `/speckit-specify` | Especificacion | Crea spec detallada de un feature |
| `/speckit-clarify` | Pre-plan | Preguntas estructuradas para reducir ambiguedad |
| `/speckit-plan` | Planificacion | Plan de implementacion con pasos concretos |
| `/speckit-checklist` | Validacion | Checklists de calidad y completitud |
| `/speckit-analyze` | Validacion | Informe de consistencia entre artefactos |
| `/speckit-tasks` | Ejecucion | Genera tareas accionables |
| `/speckit-implement` | Ejecucion | Implementa siguiendo specs y tareas |
| `/speckit-taskstoissues` | Tracking | Exporta tareas a GitHub Issues |

## Estructura de archivos

```
.specify/
├── memory/
│   └── constitution.md          # Principios del proyecto
├── templates/
│   ├── constitution-template.md
│   ├── spec-template.md
│   ├── plan-template.md
│   ├── tasks-template.md
│   └── checklist-template.md
├── scripts/bash/                # Scripts de automatizacion
├── integrations/                # Config de integracion con Claude
├── init-options.json
└── integration.json

.claude/skills/
├── speckit-constitution/
├── speckit-specify/
├── speckit-plan/
├── speckit-tasks/
├── speckit-implement/
├── speckit-clarify/
├── speckit-analyze/
├── speckit-checklist/
└── speckit-taskstoissues/
```

## Principios clave

1. **Specs primero, codigo despues**: nunca implementar sin spec aprobada
2. **Constitution es ley**: todos los artefactos deben cumplir los principios
3. **Trazabilidad**: cada tarea conecta con su spec y plan
4. **Calidad verificable**: los checklists validan completitud antes de implementar
