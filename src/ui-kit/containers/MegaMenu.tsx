import { ReactNode, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";


interface MegaMenuProps {
  triggerId: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  duration?: number;
  delay?: number;
  effect?: "ease" | "linear";
  backgroundColor?: string;
  zIndex?: number;
}

export const MegaMenu = ({
  triggerId,
  isOpen,
  onClose,
  children,
  width = "100%",
  height = "400px",
  duration = 0.4,
  delay = 0,
  effect = "ease",
  backgroundColor = "#ffffff",
  zIndex = 1000,
}: MegaMenuProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    setPosition({
      top: rect.bottom,
      left: rect.left,
      width: rect.width,
    });

    // Задержка перед началом анимации
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isOpen, triggerId, duration, delay]);

  // Закрытие при клике вне меню
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const trigger = document.getElementById(triggerId);
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        trigger &&
        !trigger.contains(e.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, triggerId]);

  if (!isOpen && !isClosing) return null;

  const getTransitionTiming = () => {
    return effect === "ease" ? "ease-out" : "linear";
  };

  return createPortal(
    <>
      {/* Backdrop (полупрозрачный оверлей) */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: zIndex - 1,
          background: "rgba(0,0,0,0.1)",
          opacity: isAnimating && !isClosing ? 1 : 0,
          transition: `opacity ${duration}s ${getTransitionTiming()}`,
          pointerEvents: isAnimating && !isClosing ? "auto" : "none",
        }}
      />

      {/* Mega Menu */}
      <div
        ref={menuRef}
        style={{
          position: "fixed",
          top: position.top,
          left: typeof width === "string" && width === "100%" ? 0 : position.left,
          width,
          height,
          zIndex,
          backgroundColor,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          overflow: "hidden",
          opacity: isAnimating && !isClosing ? 1 : 0,
          transform: isAnimating && !isClosing 
            ? "translateY(0)" 
            : "translateY(-20px)",
          transition: `opacity ${duration}s ${getTransitionTiming()}, transform ${duration}s ${getTransitionTiming()}`,
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

// ============================================
// Пример использования с Navbar
// ============================================
// import { useState } from "react";
// import { MegaMenu } from "./MegaMenu";
//
// export default function App() {
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//
//   const menuItems = [
//     { id: "products", label: "Продукты" },
//     { id: "solutions", label: "Решения" },
//     { id: "resources", label: "Ресурсы" },
//   ];
//
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="bg-white shadow-md">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center gap-8 h-16">
//             <div className="font-bold text-xl">Logo</div>
//             
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 id={`menu-btn-${item.id}`}
//                 onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
//                 className={`px-4 py-2 rounded hover:bg-gray-100 transition ${
//                   activeMenu === item.id ? "bg-gray-100" : ""
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>
//
//       {/* Mega Menus */}
//       <MegaMenu
//         triggerId="menu-btn-products"
//         isOpen={activeMenu === "products"}
//         onClose={() => setActiveMenu(null)}
//         height="300px"
//         duration={0.3}
//       >
//         <div className="container mx-auto p-8">
//           <div className="grid grid-cols-3 gap-8">
//             <div>
//               <h3 className="font-bold text-lg mb-4">Категория 1</h3>
//               <ul className="space-y-2">
//                 <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Продукт 1</li>
//                 <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Продукт 2</li>
//                 <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Продукт 3</li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold text-lg mb-4">Категория 2</h3>
//               <ul className="space-y-2">
//                 <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Продукт 4</li>
//                 <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Продукт 5</li>
//                 <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Продукт 6</li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold text-lg mb-4">Категория 3</h3>
//               <ul className="space-y-2">
//                 <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Продукт 7</li>
//                 <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Продукт 8</li>
//                 <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Продукт 9</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </MegaMenu>
//
//       <MegaMenu
//         triggerId="menu-btn-solutions"
//         isOpen={activeMenu === "solutions"}
//         onClose={() => setActiveMenu(null)}
//         height="250px"
//         backgroundColor="#f8fafc"
//       >
//         <div className="container mx-auto p-8">
//           <h3 className="font-bold text-2xl mb-4">Наши решения</h3>
//           <p className="text-gray-600">Контент для раздела "Решения"</p>
//         </div>
//       </MegaMenu>
//
//       <MegaMenu
//         triggerId="menu-btn-resources"
//         isOpen={activeMenu === "resources"}
//         onClose={() => setActiveMenu(null)}
//         height="200px"
//       >
//         <div className="container mx-auto p-8">
//           <h3 className="font-bold text-2xl mb-4">Ресурсы</h3>
//           <p className="text-gray-600">Контент для раздела "Ресурсы"</p>
//         </div>
//       </MegaMenu>
//
//       {/* Основной контент страницы */}
//       <div className="container mx-auto p-8">
//         <h1 className="text-4xl font-bold mb-4">Главная страница</h1>
//         <p className="text-gray-600">Нажмите на пункты меню выше, чтобы увидеть мега-меню</p>
//       </div>
//     </div>
//   );
// }