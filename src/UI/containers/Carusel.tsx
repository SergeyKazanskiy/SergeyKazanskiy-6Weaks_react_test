import { useState, useRef, useEffect } from 'react';

interface Card {
  id: number;
  image: string;
  title: string;
}

interface CarouselProps {
  cards: Card[];
}

export default function Carousel({ cards }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, cards.length - 1));
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    goToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    goToSlide(currentIndex + 1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to nearest card
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollPosition = containerRef.current.scrollLeft;
      const cardWidth = 300; // ширина карточки
      const gap = 20; // gap между карточками
      const offset = (containerWidth - cardWidth) / 2;
      
      const index = Math.round((scrollPosition + offset) / (cardWidth + gap));
      goToSlide(index);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const cardWidth = 300;
      const gap = 20;
      const containerWidth = containerRef.current.offsetWidth;
      const offset = (containerWidth - cardWidth) / 2;
      
      containerRef.current.scrollTo({
        left: currentIndex * (cardWidth + gap) - offset,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      {/* Левая стрелка */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Контейнер карусели */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="flex gap-5 overflow-x-hidden cursor-grab active:cursor-grabbing select-none px-[calc(50%-150px)]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, index) => {
          const isCenter = index === currentIndex;
          return (
            <div
              key={card.id}
              onClick={() => !isDragging && goToSlide(index)}
              className={`shrink-0 rounded-xl overflow-hidden bg-white shadow-lg transition-all duration-500 ${
                isCenter 
                  ? 'w-300px h-400px scale-110' 
                  : 'w-300px h-400px scale-90 opacity-60'
              }`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-300px object-cover"
                draggable="false"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Правая стрелка */}
      <button
        onClick={handleNext}
        disabled={currentIndex === cards.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Индикаторы */}
      <div className="flex justify-center gap-2 mt-8">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-blue-600 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Пример использования:
// const sampleCards = [
//   { id: 1, image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400', title: 'Карточка 1' },
//   { id: 2, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', title: 'Карточка 2' },
//   { id: 3, image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400', title: 'Карточка 3' },
//   { id: 4, image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400', title: 'Карточка 4' },
//   { id: 5, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', title: 'Карточка 5' },
// ];

// function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <Carousel cards={sampleCards} />
//     </div>
//   );
// }