-- Вариант 1
CREATE OR REPLACE FUNCTION generate_electrical_layout(node_id UUID)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
  final_result JSONB;
BEGIN
  WITH 
  -- 1. Разворачиваем оборудование и датчики, формируя полные имена
  all_signals AS (
    SELECT 
      unit->>'name' || '_' || sensor->>'tag' as full_tag,
      -- Нумеруем все сигналы в узле по порядку (0, 1, 2...)
      (row_number() OVER () - 1) as global_idx
    FROM tech_nodes tn
    CROSS JOIN LATERAL jsonb_array_elements(tn.equipment) AS unit
    CROSS JOIN LATERAL jsonb_array_elements(unit->'sensors') AS sensor
    WHERE tn.id = node_id
  ),

  -- 2. Математический расчет адресации
  calculated_layout AS (
    SELECT 
      full_tag,
      (global_idx / 16 / 8) + 1 as section_num, -- Секция (каждые 128 сигналов)
      ((global_idx / 16) % 8) + 1 as module_num, -- Модуль в секции (1-8)
      (global_idx % 16) + 1 as input_num        -- Вход в модуле (1-16)
    FROM all_signals
  ),

  -- 3. Сборка иерархии JSON (снизу вверх)
  structured_json AS (
    SELECT 
      section_num,
      jsonb_agg(
        jsonb_build_object(
          'module_index', module_num,
          'signals', signals_in_module
        ) ORDER BY module_num
      ) as modules
    FROM (
      SELECT 
        section_num, 
        module_num, 
        jsonb_agg(jsonb_build_object('terminal', input_num, 'tag', full_tag) ORDER BY input_num) as signals_in_module
      FROM calculated_layout
      GROUP BY section_num, module_num
    ) sub
    GROUP BY section_num
  )

  -- 4. Финальный вывод
  SELECT jsonb_agg(
    jsonb_build_object('section_id', section_num, 'modules', modules) 
    ORDER BY section_num
  ) INTO final_result
  FROM structured_json;

  RETURN final_result;
END;
$$;



-- Вариант 2
with signals as (
  select s.id, s.code || '_' || e.number as signal_code
  from sensor s
  join equipment e on e.id = s.equipment_id
)
, numbered as (
  select *, row_number() over (order by id) - 1 as signal_idx
  from signals
)
, assigned as (
  select *, signal_idx / 16 as module_idx, (signal_idx / 16) / 8 as section_idx
  from numbered
)

select jsonb_agg(
  jsonb_build_object('section', section_idx + 1, 'modules', modules)
  order by section_idx
)
from (
  select section_idx,
    jsonb_agg(
      jsonb_build_object('module', module_idx + 1, 'signals', signals)
      order by module_idx
    ) as modules
  from (
    select section_idx, module_idx,
      jsonb_agg(signal_code order by signal_idx) as signals
    from assigned
    group by section_idx, module_idx
  ) m
  group by section_idx
) s;