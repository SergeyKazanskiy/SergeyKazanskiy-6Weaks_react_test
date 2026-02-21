import { IconName, getIconPath } from "../../constants/icons"

type IconState = "active" | "inactive" | "disabled"

type IconProps = {
  name: IconName
  state?: IconState
  size?: number
}

const stateColorMap: Record<IconState, string> = {
  active: "var(--icon-active)",
  inactive: "var(--icon-inactive)",
  disabled: "var(--icon-disabled)",
}

export function Icon({ name, state = "inactive", size = 24 }: IconProps) {
  const pathD = getIconPath(name)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stateColorMap[state]}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={pathD} />
    </svg>
  )
}

// Usage example:
// <Icon name="home" state="active" size={24} />