import { useEffect, useState } from 'react';

const MATRIX_CHARS = '0101010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン010101';

interface MatrixTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  scrambleSpeed?: number;
}

export function MatrixText({ 
  text, 
  delay = 0, 
  speed = 40, 
  className = "",
  scrambleSpeed = 3
}: MatrixTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let timer: any = null;

    const timeout = setTimeout(() => {
      timer = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ' || char === '\n') return char;
              if (index < iteration) {
                return text[index];
              }
              return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
            })
            .join('');
        });

        iteration += 1 / scrambleSpeed;

        if (iteration >= text.length) {
          setDisplayText(text);
          setIsDone(true);
          clearInterval(timer);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [text, delay, speed, scrambleSpeed]);

  return (
    <span className={`${className} ${!isDone ? 'text-emerald-400 font-mono tracking-wider glow-emerald' : ''} transition-all duration-300`}>
      {displayText || text.replace(/./g, '0')}
    </span>
  );
}
