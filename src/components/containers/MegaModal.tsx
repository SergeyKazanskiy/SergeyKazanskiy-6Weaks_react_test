import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";


interface MegaModalProps {
  triggerId: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  duration?: number;
  delay?: number;
  effect?: "spring" | "ease" | "linear";
  fromColor?: string;
  toColor?: string;
  zIndex?: number;
}

export const MegaModal = ({
  triggerId,
  isOpen,
  onClose,
  children,
  width = "80vw",
  height = "70vh",
  duration = 0.5,
  delay = 0,
  effect = "ease",
  fromColor = "#2563eb",
  toColor = "#ffffff",
  zIndex = 2000,
}: MegaModalProps) => {
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsClosing(false);
        setIsAnimating(false);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }

    const el = document.getElementById(triggerId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });

    // Задержка перед началом анимации
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isOpen, triggerId, duration, delay]);

  if (!isOpen && !isClosing) return null;

  const getTransitionTiming = () => {
    if (effect === "spring") return "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    if (effect === "ease") return "ease-in-out";
    return "linear";
  };

  const translateX = origin.x - window.innerWidth / 2;
  const translateY = origin.y - window.innerHeight / 2;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex,
          background: "rgba(0,0,0,0.2)",
          opacity: isAnimating && !isClosing ? 1 : 0,
          transition: `opacity ${duration}s ${getTransitionTiming()}`,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width,
          height,
          zIndex: zIndex + 1,
          borderRadius: 16,
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          overflow: "hidden",
          backgroundColor: isAnimating && !isClosing ? toColor : fromColor,
          transform: isAnimating && !isClosing 
            ? "translate(-50%, -50%) scale(1)" 
            : `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(0)`,
          transition: `transform ${duration}s ${getTransitionTiming()}, background-color ${duration}s ${getTransitionTiming()}`,
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

// ============================================
// Пример использования
// ============================================
// import { useState } from "react";
// import { MegaModal } from "./MegaModal";
//
// export default function App() {
//   const [isOpen, setIsOpen] = useState(false);
//
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <button
//         id="open-modal-btn"
//         onClick={() => setIsOpen(true)}
//         className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//       >
//         Открыть модалку
//       </button>
//
//       <MegaModal
//         triggerId="open-modal-btn"
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         width="600px"
//         height="400px"
//         duration={0.6}
//         effect="spring"
//         fromColor="#3b82f6"
//         toColor="#ffffff"
//       >
//         <div className="p-8">
//           <h2 className="text-2xl font-bold mb-4">Mega Modal</h2>
//           <p className="text-gray-700 mb-6">
//             Это модальное окно анимируется от позиции кнопки с плавным изменением цвета!
//           </p>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
//           >
//             Закрыть
//           </button>
//         </div>
//       </MegaModal>
//     </div>
//   );
// }