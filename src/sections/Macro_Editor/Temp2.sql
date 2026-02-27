CREATE OR REPLACE FUNCTION get_tech_node_details_nested(node_id UUID)
  RETURNS JSONB
  LANGUAGE plpgsql
  AS $$
  DECLARE
    result JSONB;
  BEGIN
    SELECT jsonb_build_object(
      'node_id', tn.id,
      'node_name', tn.name,
      'units', jsonb_agg(
        jsonb_build_object(
          'unit_name', unit->>'equipment_name',
          'motors', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'motor_label', motor->>'label',
                'power', motor->>'power',
                -- Подбор аппаратов для конкретного двигателя
                'apparatus_list', (
                  SELECT jsonb_agg(
                    jsonb_build_object(
                      'name', a.name,
                      'type', a.type,
                      -- Вызов вашей функции подбора по мощности и ID схемы
                      'selection', pick_apparatus_by_current(
                                     (motor->>'power')::numeric, 
                                     (motor->>'id_scheme')::uuid
                                   )
                    )
                  )
                  FROM scheme_apparatus sa
                  JOIN apparatus a ON a.id = sa.apparatus_id
                  WHERE sa.scheme_id = (motor->>'id_scheme')::uuid
                )
              )
            )
            FROM jsonb_array_elements(unit->'motors') AS motor
          )
        )
      )
    )
    INTO result
    FROM tech_nodes tn
    -- Разворачиваем оборудование
    CROSS JOIN LATERAL jsonb_array_elements(tn.equipment) AS unit
    WHERE tn.id = node_id
    GROUP BY tn.id, tn.name;
  
    RETURN result;
  END;
  $$;


CREATE OR REPLACE FUNCTION get_node_details_simple(node_id UUID)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
  final_result JSONB;
BEGIN
  -- ШАГ 1: "Разворачиваем" всё оборудование и двигатели в одну плоскую таблицу
  -- Это как flatMap в TypeScript
  WITH flat_data AS (
    SELECT 
      tn.name as node_name,
      unit->>'equipment_name' as unit_name,
      motor->>'label' as motor_label,
      (motor->>'power')::numeric as pwr,
      (motor->>'id_scheme')::uuid as sch_id
    FROM tech_nodes tn
    CROSS JOIN LATERAL jsonb_array_elements(tn.equipment) AS unit
    CROSS JOIN LATERAL jsonb_array_elements(unit->'motors') AS motor
    WHERE tn.id = node_id
  ),

  -- ШАГ 2: Для каждой строки подбираем аппараты
  -- Это как .map() внутри которого вызывается функция
  enriched_data AS (
    SELECT 
      *,
      (
        SELECT jsonb_agg(jsonb_build_object('name', a.name, 'res', pick_apparatus_by_current(pwr, a.id)))
        FROM scheme_apparatus sa
        JOIN apparatus a ON a.id = sa.apparatus_id
        WHERE sa.scheme_id = sch_id
      ) as apps
    FROM flat_data
  )

  -- ШАГ 3: Собираем всё обратно в один красивый JSON
  SELECT jsonb_build_object(
    'node', (SELECT node_name FROM enriched_data LIMIT 1),
    'data', jsonb_agg(enriched_data)
  ) 
  INTO final_result
  FROM enriched_data;

  RETURN final_result;
END;
$$;



SELECT t.city, top_h.humidity
FROM temperature AS t
LEFT JOIN LATERAL (
    SELECT humidity
    FROM humidity_data
    WHERE city = t.city -- Ссылка на поле из внешней таблицы
    ORDER BY ts DESC
    LIMIT 1
) AS top_h ON TRUE;