import { Disclosure, Transition, DisclosureButton, DisclosurePanel } from '@headlessui/react';


interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const ChevronIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

export function AccordionCustom({ items }: AccordionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
      {items.map((item) => (

        <Disclosure key={item.id}>
          {({ open }) => (
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <DisclosureButton className="flex w-full justify-between items-center px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900">{item.title}</span>
                <div className={`${ open ? 'rotate-180' : '' } transition-transform duration-300 text-gray-500`}>
                  <ChevronIcon />
                </div>
              </DisclosureButton>
              
              <Transition
                enter="transition-all duration-300 ease-out"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-96"
                leave="transition-all duration-200 ease-out"
                leaveFrom="opacity-100 max-h-96"
                leaveTo="opacity-0 max-h-0"
              >
                <DisclosurePanel className="px-6 py-4 bg-gray-50 text-gray-700">
                  {item.content}
                </DisclosurePanel>
              </Transition>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}