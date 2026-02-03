import React, { ReactNode, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Transition } from '@headlessui/react';


interface SpritesProps {
  width?: string | number;
  height?: string | number;
  children: ReactNode;
}

export const Sprites = ({ width = "100%", height = "500px", children }: SpritesProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // анимация срабатывает только один раз
    threshold: 0.1,    // секция считается видимой, когда 10% видимо
  });

  return (
    <div
      ref={ref}
      style={{ width, height, position: "relative", overflow: "hidden" }}
    >
      {/* Передаем состояние inView в детей через React.cloneElement */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as React.ReactElement<{ inView?: boolean }>, 
            { inView }
    );
  }
  return child;
})}
    </div>
  );
};

// Sprite.tsx
interface SpriteProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  delay?: number;
  duration?: number;
  effect?: "fadeOut" | "scaleUp" | "none";
  children: ReactNode;
  inView?: boolean; // <- сюда приходит сигнал от Sprites
}

export const Sprite = ({
  start,
  end,
  delay = 0,
  duration = 1,
  effect = "none",
  children,
  inView = true,
}: SpriteProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(inView), delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, delay]);

  const getExitClasses = () => {
    if (effect === "fadeOut") return "opacity-0";
    if (effect === "scaleUp") return "opacity-0 scale-150";
    return "";
  };

  return (
    <Transition
      show={isVisible}
      appear={true}
      enter={`transition-all duration-[${duration * 1000}ms] ease-out`}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave={`transition-all duration-[${duration * 1000}ms] ease-out`}
      leaveTo={getExitClasses()}
    >
      <div style={{
          position: "absolute",
          transform: `translate(${isVisible ? end.x * 100 : start.x * 100}%, ${isVisible ? end.y * 100 : start.y * 100}%)`,
          transitionProperty: "transform, opacity",
          transitionDuration: `${duration}s`,
          transitionDelay: `${delay}s`,
        }}
      >
        {children}
      </div>
    </Transition>
  );
};