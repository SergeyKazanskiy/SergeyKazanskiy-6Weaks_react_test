import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";


export const buttonStyles = {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
      danger: "bg-red-600 text-white hover:bg-red-700",
    },
  
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    },
  
    rounded: {
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    },
  
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
  
    border: {
      none: "border border-transparent",
      soft: "border border-black/10",
      strong: "border border-black/20",
    },
  
    effect: {
      none: "",
      lift: "hover:-translate-y-0.5 hover:shadow-lg",
      press: "active:scale-95",
      glow: "hover:shadow-[0_0_0_3px_rgba(59,130,246,0.4)]",
      underline: "hover:underline",
    },
  };
  

type Variant = keyof typeof buttonStyles.variant;
type Size = keyof typeof buttonStyles.size;
type Rounded = keyof typeof buttonStyles.rounded;
type Shadow = keyof typeof buttonStyles.shadow;
type Border = keyof typeof buttonStyles.border;
type Effect = keyof typeof buttonStyles.effect;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  rounded?: Rounded;
  shadow?: Shadow;
  border?: Border;
  effect?: Effect;
}

export const Button = ({
  variant = "primary",
  size = "md",
  rounded = "md",
  shadow = "none",
  border = "none",
  effect = "press",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        buttonStyles.variant[variant],
        buttonStyles.size[size],
        buttonStyles.rounded[rounded],
        buttonStyles.shadow[shadow],
        buttonStyles.border[border],
        buttonStyles.effect[effect],
        className
      )}
      {...props}
    />
  );
};


// Пример использования:
{/* <Button variant="ghost" size="sm">
  Ghost
</Button>

<Button variant="danger" shadow="md" rounded="full">
  Delete
</Button> */}