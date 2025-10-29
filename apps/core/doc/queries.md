[Select Entidades](#entidades)

[Select Vehiculos por Entidad](#vehiculos-por-entidad)

[Select Lineas por Entidad](#lineas-por-entidad)

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

## Vehiculos por entidad

```
CREATE OR REPLACE VIEW v_mba_vehiculos_por_entidad AS
SELECT
    -- Datos de la entidad
    e.id AS entidad_id,
    e.nombre AS entidad_nombre,
    e.nombre_corto AS entidad_nombre_corto,
    e.cuit AS entidad_cuit,

    -- Datos del vehículo
    v.id AS vehiculo_id,
    v.dominio,
    v.numero_serie_chasis,
    v.numero_serie_motor,
    v.numero_serie_carroceria,
    v.fecha_ultima_actualizacion,

    -- Datos de colectivo (si aplica)
    vdc.interno,
    vdc.valor_litro,

    -- Estado actual del vehículo
    op_estado.nombre_mostrable AS estado_vehiculo,

    -- Tipo y subtipo de vehículo
    vt.descripcion AS tipo_vehiculo,
    vst.descripcion AS subtipo_vehiculo,

    -- Datos de la carrocería
    c.carroceria_modelo,
    c.cantidad_asientos,
    fc.fabricante AS fabricante_carroceria,

    -- Datos del chasis
    ch.chasis_modelo,
    fch.fabricante AS fabricante_chasis,

    -- Datos del motor
    m.motor_modelo,
    fm.fabricante AS fabricante_motor,

    -- Asignación actual
    vea.fecha_desde AS asignacion_fecha_desde,
    vea.fecha_hasta AS asignacion_fecha_hasta,
    vea.observaciones AS asignacion_observaciones,

    -- Línea asignada (si existe)
    l.numero_linea,
    l.color_linea,
    vla.fecha_desde AS linea_fecha_desde,
    vla.fecha_hasta AS linea_fecha_hasta

FROM vehiculos v

-- Asignación a entidad (asignaciones activas o más recientes)
LEFT JOIN vehiculo_entidad_asignaciones vea ON v.id = vea.vehiculo_id
    AND (vea.fecha_hasta IS NULL OR vea.fecha_hasta >= CURRENT_DATE)

-- Entidad
LEFT JOIN entidades e ON vea.entidad_id = e.id

-- Datos específicos de colectivos
LEFT JOIN vehiculos_datos_colectivos vdc ON v.id = vdc.vehiculo_id
    AND (vdc.fecha_vigencia_hasta IS NULL OR vdc.fecha_vigencia_hasta >= CURRENT_DATE)

-- Estado del vehículo
LEFT JOIN opciones op_estado ON vdc.estado_id = op_estado.id

-- Tipo y subtipo de transporte
LEFT JOIN vehiculos_subtipos_transporte vst ON v.vehiculo_subtipo_transporte_id = vst.id
LEFT JOIN vehiculos_tipos_transporte vt ON vst.vehiculo_tipo_id = vt.id

-- Carrocería y fabricante
LEFT JOIN carrocerias c ON v.carroceria_id = c.id
LEFT JOIN fabricantes fc ON c.fabricante_id = fc.id

-- Chasis y fabricante
LEFT JOIN chasis ch ON v.chasis_id = ch.id
LEFT JOIN fabricantes fch ON ch.fabricante_id = fch.id

-- Motor y fabricante
LEFT JOIN motores m ON v.motor_id = m.id
LEFT JOIN fabricantes fm ON m.fabricante_id = fm.id

-- Asignación a línea (asignaciones activas)
LEFT JOIN vehiculo_linea_asignaciones vla ON v.id = vla.vehiculo_id
    AND (vla.fecha_hasta IS NULL OR vla.fecha_hasta >= CURRENT_DATE)
LEFT JOIN lineas l ON vla.linea_id = l.id

WHERE vea.id IS NOT NULL  -- Solo vehículos con asignación

ORDER BY e.nombre, v.dominio;
```

## Lineas por entidad:

```
CREATE OR REPLACE VIEW v_mba_lineas_entidad_detalle AS
WITH base_lineas AS (
  SELECT
    l.id AS linea_id,
    l.numero_linea,
    l.color_linea,
    l.entidad_id
  FROM lineas l
)
SELECT
  bl.entidad_id,
  bl.linea_id,
  bl.numero_linea,
  bl.color_linea,
  jsonb_build_object(
    'ramales', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', r.id,
          'ramal', r.ramal,
          'color_linea', r.color_linea,
          'cabecera_partida', r.cabecera_partida,
          'cabecera_destino', r.cabecera_destino
        )
      )
      FROM ramales r
      WHERE r.linea_id = bl.linea_id
    ),
    'recorridos', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', re.id,
          'descripcion_ruta', re.descripcion_ruta,
          'sentido_id', re.sentido_id
        )
      )
      FROM recorridos re
      JOIN ramales rr ON rr.id = re.ramal_id
      WHERE rr.linea_id = bl.linea_id
    ),
    'paradas', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', p.id,
          'nombre', p.nombre,
          'ubicacion', p.ubicacion
        )
      )
      FROM paradas p
      JOIN recorridos re ON re.id = p.recorrido_id
      JOIN ramales rr ON rr.id = re.ramal_id
      WHERE rr.linea_id = bl.linea_id
    ),
    'asignaciones', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', a.id,
          'fecha_desde', a.fecha_desde,
          'fecha_hasta', a.fecha_hasta,
          'observaciones', a.observaciones
        )
      )
      FROM linea_entidad_asignaciones a
      WHERE a.linea_id = bl.linea_id
    ),
    'documentos', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', d.id,
          'url', d.url,
          'title', d.title,
          'doc_type_opciones_id', d.doc_type_opciones_id
        )
      )
      FROM links_and_docs d
      WHERE d.entity_type = 'lineas' AND d.entity_id = bl.linea_id
    ),
    'notas', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', n.id,
          'title', n.title,
          'content', n.content
        )
      )
      FROM notes n
      WHERE n.entity_type = 'lineas' AND n.entity_id = bl.linea_id
    )
  ) AS detalles
FROM base_lineas bl;
```
