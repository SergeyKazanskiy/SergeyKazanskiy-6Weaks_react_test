type Sensor = {
  id: string
  code: string
}

type Equipment = {
  id: string
  number: number
  sensors: Sensor[]
}

type Signal = {
  code: string
}

type Module = {
  signals: Signal[]
}

type Section = {
  modules: Module[]
}

function createSignal(sensor: Sensor, equipmentNumber: number) {
    return { code: `${sensor.code}_${equipmentNumber}` }
}

function createModule() {
  return { signals: [] }
}

function createSection() {
  return { modules: [] }
}



function buildIOLayout(equipments: Equipment[]) {
  const MAX_SIGNALS = 16
  const MAX_MODULES = 8

  const sections: any[] = []

  let sectionIdx = 0
  let moduleIdx = 0

  // инициализация первой секции и модуля
  sections[0] = createSection()
  sections[0].modules[0] = createModule()

  for (const equipment of equipments) {
    for (const sensor of equipment.sensors) {
      const module = sections[sectionIdx].modules[moduleIdx]

      // если модуль заполнен — переключаемся
      if (module.signals.length >= MAX_SIGNALS) {
        moduleIdx++

        // если секция заполнена — новая секция
        if (moduleIdx >= MAX_MODULES) {
          sectionIdx++
          moduleIdx = 0
          sections[sectionIdx] = createSection()
        }

        sections[sectionIdx].modules[moduleIdx] = createModule()
      }

      // добавляем сигнал
      sections[sectionIdx].modules[moduleIdx].signals.push(
        createSignal(sensor, equipment.number)
      )
    }
  }

  return sections
}