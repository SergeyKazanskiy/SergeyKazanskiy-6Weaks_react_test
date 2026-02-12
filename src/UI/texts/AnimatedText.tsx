
interface AnimatedTextProps {
  text: string;
  letterSpeed?: number; // секунда на букву
  wordSpeed?: number;   // секунда на слово (дополнительная задержка между словами)
  className?: string;
}

export const AnimatedText = ({
  text,
  letterSpeed = 0.05,
  wordSpeed = 0.2,
  className,
}: AnimatedTextProps) => {
  const words = text.split(" ");

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(1em);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animated-letter {
          display: inline-block;
          opacity: 0;
          animation: slideUp 0.3s forwards;
        }
      `}</style>
      
      <span className={className} style={{ display: "inline-block", overflow: "hidden" }}>
        {words.map((word, wi) => {
          const letters = word.split("");
          return (
            <span key={wi} style={{ display: "inline-block", marginRight: "0.25em" }}>
              {letters.map((letter, li) => (
                <span
                  key={li}
                  className="animated-letter"
                  style={{
                    animationDelay: `${wi * wordSpeed + li * letterSpeed}s`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </>
  );
};