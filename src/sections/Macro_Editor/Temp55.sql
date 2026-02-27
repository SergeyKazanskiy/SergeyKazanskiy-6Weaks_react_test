with
params as (
  select 16 as max_signals, 8 as max_modules
),
flat as (
  select
    s.id,
    s.code || '_' || e.number as signal_code,
    row_number() over (order by s.id) - 1 as idx
  from sensor s
  join equipment e on e.id = s.equipment_id
),
assigned as (
  select
    f.signal_code,
    (f.idx / p.max_signals) as module_idx,
    (f.idx / p.max_signals) / p.max_modules as section_idx,
    f.idx
  from flat f
  cross join params p
)

select jsonb_agg(
         jsonb_build_object(
           'modules',
           modules
         )
         order by section_idx
       )
from (
  select
    section_idx,
    jsonb_agg(
      jsonb_build_object(
        'signals',
        signals
      )
      order by module_idx
    ) as modules
  from (
    select
      section_idx,
      module_idx,
      jsonb_agg(signal_code order by idx) as signals
    from assigned
    group by section_idx, module_idx
  ) m
  group by section_idx
) s;