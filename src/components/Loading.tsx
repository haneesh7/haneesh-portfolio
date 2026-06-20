import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 400);
    }, 200);
  }

  // Hard timeout: if model hasn't loaded in 8s, force-open the site anyway
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
      setTimeout(() => setIsLoaded(true), 400);
    }, 8000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 300);
      }
    });
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>

      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  // Fast initial ramp: 0→80% in ~1.5 seconds
  let interval = setInterval(() => {
    if (percent < 80) {
      const rand = Math.round(Math.random() * 12) + 4; // 4-16% jumps
      percent = Math.min(80, percent + rand);
      setLoading(percent);
    } else {
      clearInterval(interval);
      // Slow hold at 80-90% waiting for model to load
      interval = setInterval(() => {
        if (percent < 90) {
          percent = percent + 1;
          setLoading(percent);
        } else {
          clearInterval(interval);
        }
      }, 800);
    }
  }, 80);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      // Snap to 100% quickly once model is ready
      interval = setInterval(() => {
        if (percent < 100) {
          percent += 3;
          if (percent > 100) percent = 100;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 16);
    });
  }
  return { loaded, percent, clear };
};
