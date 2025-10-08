[Select Entidades](#entidades)

## Entidades:

```
CREATE OR REPLACE VIEW v_mba_empresas_operadoras
SELECT
    e.id,
    e.nombre,
    e.nombre_corto,
    e.razon_social,
    e.cuit,
    te.nombre_mostrable AS tipo_entidad,

    -- === Estadísticas base ===
    COALESCE(lineas_stats.total_lineas, 0)        AS total_lineas,
    COALESCE(lineas_stats.total_ramales, 0)       AS total_ramales,
    COALESCE(vehiculos_stats.total_vehiculos, 0)  AS total_vehiculos,
    COALESCE(vehiculos_linea_stats.vehiculos_con_linea, 0) AS vehiculos_con_linea,
    COALESCE(vehiculos_estado_stats.vehiculos_activos, 0)  AS vehiculos_activos,
    COALESCE(personas_stats.total_personas, 0)    AS total_personas,

    -- === Clasificación operativa ===
    CASE
        WHEN COALESCE(lineas_stats.total_lineas, 0) > 0 THEN 'Operador de Transporte'
        WHEN COALESCE(vehiculos_stats.total_vehiculos, 0) > 0 THEN 'Propietario de Vehículos'
        WHEN COALESCE(personas_stats.total_personas, 0) > 0 THEN 'Con Personal Asociado'
        ELSE 'Registro Básico'
    END AS estado_operacional,

    -- === Contacto ===
    COALESCE(telefonos_json.telefonos, '[]'::json) AS telefonos,
    COALESCE(correos_json.correos, '[]'::json)     AS correos,
    contacto_principal.telefono_principal,
    contacto_principal.email_principal

FROM entidades e
LEFT JOIN opciones te ON e.tipo_entidad_id = te.id

-- ============================================================
-- Líneas y ramales asociados
-- ============================================================
LEFT JOIN (
    SELECT
        l.entidad_id,
        COUNT(DISTINCT l.id) AS total_lineas,
        COUNT(DISTINCT r.id) AS total_ramales
    FROM lineas l
    LEFT JOIN ramales r ON l.id = r.linea_id
    GROUP BY l.entidad_id
) lineas_stats ON e.id = lineas_stats.entidad_id

-- ============================================================
-- Vehículos asignados actualmente a la entidad
-- ============================================================
LEFT JOIN (
    SELECT
        vea.entidad_id,
        COUNT(DISTINCT vea.vehiculo_id) AS total_vehiculos
    FROM vehiculo_entidad_asignaciones vea
    WHERE vea.fecha_hasta IS NULL
    GROUP BY vea.entidad_id
) vehiculos_stats ON e.id = vehiculos_stats.entidad_id

-- ============================================================
-- Vehículos de la entidad que además están asignados a líneas
-- ============================================================
LEFT JOIN (
    SELECT
        vea.entidad_id,
        COUNT(DISTINCT vla.vehiculo_id) AS vehiculos_con_linea
    FROM vehiculo_entidad_asignaciones vea
    JOIN vehiculo_linea_asignaciones vla
        ON vea.vehiculo_id = vla.vehiculo_id
    WHERE vea.fecha_hasta IS NULL
      AND vla.fecha_hasta IS NULL
    GROUP BY vea.entidad_id
) vehiculos_linea_stats ON e.id = vehiculos_linea_stats.entidad_id

-- ============================================================
-- Vehículos activos (según último estado)
-- ============================================================
LEFT JOIN (
    SELECT
        vea.entidad_id,
        COUNT(*) FILTER (WHERE oe.nombre_mostrable ILIKE 'Activo%') AS vehiculos_activos
    FROM vehiculo_entidad_asignaciones vea
    JOIN vehiculo_estado_historico veh_est
        ON vea.vehiculo_id = veh_est.vehiculo_id
    JOIN opciones oe
        ON veh_est.estado_id = oe.id
    WHERE vea.fecha_hasta IS NULL
      AND veh_est.fecha_efectiva = (
          SELECT MAX(v2.fecha_efectiva)
          FROM vehiculo_estado_historico v2
          WHERE v2.vehiculo_id = veh_est.vehiculo_id
      )
    GROUP BY vea.entidad_id
) vehiculos_estado_stats ON e.id = vehiculos_estado_stats.entidad_id

-- ============================================================
-- Personas asociadas
-- ============================================================
LEFT JOIN (
    SELECT
        aep.entidad_id,
        COUNT(*) AS total_personas
    FROM asociaciones_entidad_persona aep
    JOIN personas p ON aep.persona_id = p.id
    GROUP BY aep.entidad_id
) personas_stats ON e.id = personas_stats.entidad_id

-- ============================================================
-- Teléfonos agregados
-- ============================================================
LEFT JOIN (
    SELECT
        nt.entidad_id,
        json_agg(
            json_build_object(
                'id', nt.id,
                'numero', nt.numero_telefono,
                'tipo_telefono', tt.nombre_mostrable,
                'es_primario', nt.es_primario,
                'observaciones', nt.observaciones
            ) ORDER BY nt.es_primario DESC, nt.id
        ) AS telefonos
    FROM numeros_telefonicos nt
    LEFT JOIN opciones tt ON nt.tipo_telefono_id = tt.id
    WHERE nt.entidad_id IS NOT NULL
    GROUP BY nt.entidad_id
) telefonos_json ON e.id = telefonos_json.entidad_id

-- ============================================================
-- Correos agregados
-- ============================================================
LEFT JOIN (
    SELECT
        ce.entidad_id,
        json_agg(
            json_build_object(
                'id', ce.id,
                'correo', ce.correo,
                'tipo_correo', tc.nombre_mostrable,
                'es_primario', ce.es_primario,
                'observaciones', ce.observaciones
            ) ORDER BY ce.es_primario DESC, ce.id
        ) AS correos
    FROM correos_electronicos ce
    LEFT JOIN opciones tc ON ce.tipo_correo_id = tc.id
    WHERE ce.entidad_id IS NOT NULL
    GROUP BY ce.entidad_id
) correos_json ON e.id = correos_json.entidad_id

-- ============================================================
-- Contacto principal
-- ============================================================
LEFT JOIN (
    SELECT
        e2.id AS entidad_id,
        (SELECT numero_telefono FROM numeros_telefonicos WHERE entidad_id = e2.id AND es_primario = TRUE LIMIT 1) AS telefono_principal,
        (SELECT correo FROM correos_electronicos WHERE entidad_id = e2.id AND es_primario = TRUE LIMIT 1) AS email_principal
    FROM entidades e2
) contacto_principal ON e.id = contacto_principal.entidad_id

-- ============================================================
-- Orden sugerido
-- ============================================================
ORDER BY
    CASE
        WHEN COALESCE(lineas_stats.total_lineas, 0) > 0 THEN 1
        WHEN COALESCE(vehiculos_stats.total_vehiculos, 0) > 0 THEN 2
        WHEN COALESCE(personas_stats.total_personas, 0) > 0 THEN 3
        ELSE 4
    END,
    e.nombre;

```
