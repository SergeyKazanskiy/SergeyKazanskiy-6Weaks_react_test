export type IconName =
  | "home"
  | "settings"
  | "user"
  | "folder"
  | "bell"
  | "search"
  | "plus"
  | "trash"
  | "edit"
  | "logout"
  | "scissors"
  | "undo"
  | "redo"
  | "copy"
  | "save"
  | "print"
  | "email"
  | "chevron"
  | "model"
  | "process"
  | "description"

const iconPaths: Record<IconName, string> = {
  home: "M3 9L12 2L21 9V20H3Z",
  settings: "M12 2C6 2 2 6 2 12s4 10 10 10 10-4 10-10S18 2 12 2z",
  user: "M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5z",
  folder: "M2 6h20v12H2z",
  bell: "M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z",
  search: "M11 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
  plus: "M12 5v14M5 12h14",
  trash: "M3 6h18M8 6v12M16 6v12",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z",
  logout: "M16 17l5-5-5-5M21 12H9",

  scissors: "M3 3l18 18M6 6l12 12M6 18l12-12",
  undo: "M3 12a9 9 0 0 1 9-9h9M3 12l9 9",
  redo: "M21 12a9 9 0 0 0-9-9H3M21 12l-9 9",
  copy: "M8 2h12v12H8zM2 8h12v12H2z",
  save: "M17 3H5a2 2 0 0 0-2 2v16h14V5a2 2 0 0 0-2-2z",
  print: "M6 9h12v10H6zM6 1h12v4H6z",
  email: "M2 4h20v16H2zM2 4l10 9L22 4",
  chevron: "M6 9l6 6 6-6",

  model: "M12 2L2 7l10 5 10-5-10-5z",         // похожа на куб / схему
  process: "M4 4h16v4H4zM4 10h16v4H4zM4 16h16v4H4z", // три полосы — этапы процесса
  description: "M4 4h16v2H4zM4 8h16v2H4zM4 12h16v2H4z", // текстовые линии
}

// функция для возврата path по имени
export function getIconPath(name: IconName): string {
  return iconPaths[name]
}
