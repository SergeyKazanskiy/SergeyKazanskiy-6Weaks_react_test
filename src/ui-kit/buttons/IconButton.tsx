import { Icon } from "./Icon"
import { IconName } from "../../constants/icons"

type IconState = "active" | "inactive" | "disabled"

type IconButtonProps = {
  name: IconName
  state?: IconState
  size?: number          // размер иконки (по умолчанию 24)
  buttonSize?: number    // размер кнопки (по умолчанию 40)
  border?: boolean
  onClick?: () => void
  className?: string
}

const stateColorMap: Record<IconState, string> = {
  active: "var(--icon-active)",
  inactive: "var(--icon-inactive)",
  disabled: "var(--icon-disabled)",
}

export function IconButton({
  name,
  state = "inactive",
  size = 24,
  buttonSize = 40,
  border = false,
  onClick,
  className,
}: IconButtonProps) {
  const isDisabled = state === "disabled"

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      className={className}
      style={{
        width: buttonSize,
        height: buttonSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        background: "transparent",
        border: border
          ? `1px solid ${stateColorMap[state]}`
          : "none",
        borderRadius: 4,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.6 : 1,
        transition: "all 0.2s ease",
      }}
    >
      <Icon name={name} state={state} size={size} />
    </button>
  )
}

// Usage example:
/*
<IconButton name="save" state="active" border
  onClick={() => console.log("Saved")}
/>
*/