import { ReactNode, useState } from "react";
import { Transition } from "@headlessui/react";

interface AccordionWidgetProps {
  title: string;
  headerClass?: string; // Кастомные стили заголовка
  children: ReactNode;
}

export default function AccordionWidget({
  title,
  headerClass = "bg-blue-500 text-white",
  children,
}: AccordionWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 text-left font-semibold flex justify-between items-center ${headerClass}`}
      >
        <span>{title}</span>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </button>

      <Transition
        show={isOpen}
        enter="transition-all duration-300 ease-out"
        enterFrom="max-h-0 opacity-0"
        enterTo="max-h-96 opacity-100"
        leave="transition-all duration-200 ease-in"
        leaveFrom="max-h-96 opacity-100"
        leaveTo="max-h-0 opacity-0"
      >
        {children}
      </Transition>
    </div>
  );
}
