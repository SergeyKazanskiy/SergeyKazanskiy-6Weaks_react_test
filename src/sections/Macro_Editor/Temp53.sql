CREATE OR REPLACE FUNCTION generate_rack_layout(node_id UUID)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
  result JSONB;
BEGIN
  WITH 
  -- 1. СБОР: Превращаем JSON-дерево в плоский список датчиков с именами
  raw_signals AS (
    SELECT unit->>'name' || '_' || sensor->>'tag' as tag
    FROM tech_nodes tn
    CROSS JOIN LATERAL jsonb_array_elements(tn.equipment) AS unit
    CROSS JOIN LATERAL jsonb_array_elements(unit->'sensors') AS sensor
    WHERE tn.id = node_id
  ),

  -- 2. АДРЕСАЦИЯ: Каждому сигналу вычисляем его "координаты" в шкафу
  addressed AS (
    SELECT 
      tag,
      (row_number() OVER () - 1) as idx, -- Глобальный порядковый номер (0, 1, 2...)
      ((row_number() OVER () - 1) / 128) + 1 as s_num, -- Секция (каждые 128)
      (((row_number() OVER () - 1) / 16) % 8) + 1 as m_num, -- Модуль (1-8 внутри секции)
      ((row_number() OVER () - 1) % 16) + 1 as t_num  -- Клемма (1-16 внутри модуля)
    FROM raw_signals
  ),

  -- 3. СБОРКА: Группируем снизу вверх (Клеммы -> Модули -> Секции)
  hierarchy AS (
    SELECT s_num, 
           jsonb_agg(jsonb_build_object('module', m_num, 'tags', tags) ORDER BY m_num) as modules
    FROM (
      SELECT s_num, m_num, jsonb_agg(tag ORDER BY t_num) as tags
      FROM addressed
      GROUP BY s_num, m_num
    ) m_group
    GROUP BY s_num
  )

  -- 4. ФИНАЛ: Упаковываем в итоговый массив
  SELECT jsonb_agg(jsonb_build_object('section', s_num, 'data', modules) ORDER BY s_num)
  INTO result FROM hierarchy;

  RETURN result;
END;
$$;


Разбор алгоритма для вашего парсера:

Node: raw_signals (Extraction Layer)
Функция: Денормализация данных. Превращает глубокую иерархию в линейный массив.
Код: Ваш SELECT ... CROSS JOIN LATERAL.

Node: addressed (Calculation Layer)
Функция: Назначение координат. Здесь работает математика idx / 16 % 8.
Код: Формирует столбцы s_num, m_num, t_num.

Node: hierarchy (Recursive Aggregation Layer)
Функция: Сборка вложенного JSON.
Вложенность (Sub Flows):
m_group: Берет теги и объединяет их в модули по ключу m_num.
s_group: Берет готовые модули и объединяет их в секции по ключу s_num.
Для парсера: Наличие вложенных нод означает необходимость вложенных подзапросов FROM (SELECT ...).

Node: ФИНАЛ (Response Layer)
Функция: Упаковка в финальный массив и возврат из RPC.
Код: SELECT jsonb_agg(...) INTO result.
