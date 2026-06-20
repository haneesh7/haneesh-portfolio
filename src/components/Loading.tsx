import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLoaded(true);
    setTimeout(() => setIsLoaded(true), 300);
  };

  // Finish as soon as percent hits 100
  useEffect(() => {
    if (percent >= 100) finish();
  }, [percent]);

  // Hard cap: force open after 4 seconds NO MATTER WHAT
  useEffect(() => {
    const t = setTimeout(finish, 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    import("./utils/initialFX").then((module) => {
      setClicked(true);
      setTimeout(() => {
        try { module.initialFX?.(); } catch (_) {}
        setIsLoading(false);
      }, 250);
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
                  Loading <span>{Math.min(percent, 99)}%</span>
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
  let percent = 0;

  // Fast ramp: 0 → 85% in ~2 seconds
  const interval = setInterval(() => {
    if (percent < 85) {
      percent = Math.min(85, percent + Math.round(Math.random() * 10) + 5);
      setLoading(percent);
    } else {
      clearInterval(interval);
    }
  }, 80);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      const snap = setInterval(() => {
        if (percent < 100) {
          percent = Math.min(100, percent + 5);
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(snap);
        }
      }, 20);
    });
  }

  return { loaded, percent, clear };
};
