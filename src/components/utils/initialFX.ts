import gsap from "gsap";
import { smoother } from "../Navbar";

function splitTextNode(node: Node, splitFn: (text: string) => Node[]): Node[] {
  const result: Node[] = [];
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent || "";
    const spans = splitFn(text);
    spans.forEach(s => result.push(s));
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as HTMLElement;
    if (element.tagName === "BR") {
      result.push(element.cloneNode(true));
    } else {
      const cloned = element.cloneNode(false) as HTMLElement;
      Array.from(element.childNodes).forEach(child => {
        const childSpans = splitTextNode(child, splitFn);
        childSpans.forEach(cs => cloned.appendChild(cs));
      });
      result.push(cloned);
    }
  }
  return result;
}

function splitIntoChars(el: HTMLElement): HTMLElement[] {
  if (el.getAttribute("data-split") === "true") {
    el.textContent = el.getAttribute("data-original-text");
  } else {
    el.setAttribute("data-original-text", el.textContent || "");
    el.setAttribute("data-split", "true");
  }

  const spans: HTMLElement[] = [];
  
  const charSplitter = (text: string) => {
    return text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      spans.push(span);
      return span;
    });
  };

  const childNodes = Array.from(el.childNodes);
  el.textContent = "";
  
  childNodes.forEach((child) => {
    const splitNodes = splitTextNode(child, charSplitter);
    splitNodes.forEach((node) => el.appendChild(node));
  });

  return spans;
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingSelectors = [".landing-info h3", ".landing-intro h2", ".landing-intro h1"];
  const landingChars: HTMLElement[] = [];
  landingSelectors.forEach((sel) => {
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      landingChars.push(...splitIntoChars(el));
    });
  });

  gsap.fromTo(
    landingChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const h2InfoEls = document.querySelectorAll<HTMLElement>(".landing-h2-info");
  const h2Info1Els = document.querySelectorAll<HTMLElement>(".landing-h2-info-1");
  const h21Els = document.querySelectorAll<HTMLElement>(".landing-h2-1");
  const h22Els = document.querySelectorAll<HTMLElement>(".landing-h2-2");

  const h2InfoChars: HTMLElement[] = [];
  h2InfoEls.forEach((el) => h2InfoChars.push(...splitIntoChars(el)));

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const h2Info1Chars: HTMLElement[] = [];
  h2Info1Els.forEach((el) => h2Info1Chars.push(...splitIntoChars(el)));
  const h21Chars: HTMLElement[] = [];
  h21Els.forEach((el) => h21Chars.push(...splitIntoChars(el)));
  const h22Chars: HTMLElement[] = [];
  h22Els.forEach((el) => h22Chars.push(...splitIntoChars(el)));

  LoopText(h2InfoChars, h2Info1Chars);
  LoopText(h21Chars, h22Chars);
}

function LoopText(Text1: HTMLElement[], Text2: HTMLElement[]) {
  const tl = gsap.timeline({ repeat: -1 });
  const yVal = window.innerWidth > 1024 ? 80 : 35;
  const duration = 1.2;
  const stayDuration = 3;

  // Initial state: Text1 is visible, Text2 is hidden below
  gsap.set(Text1, { y: 0, opacity: 1 });
  gsap.set(Text2, { y: yVal, opacity: 0 });

  // Transition 1: Text1 goes up/out, Text2 comes up/in
  tl.to(Text1, {
    y: -yVal,
    opacity: 0,
    duration,
    ease: "power3.inOut",
    stagger: 0.05
  }, `+=${stayDuration}`)
  .fromTo(Text2,
    { y: yVal, opacity: 0 },
    { y: 0, opacity: 1, duration, ease: "power3.inOut", stagger: 0.05 },
    `<`
  )
  
  // Transition 2: Text2 goes up/out, Text1 comes up/in
  .to(Text2, {
    y: -yVal,
    opacity: 0,
    duration,
    ease: "power3.inOut",
    stagger: 0.05
  }, `+=${stayDuration}`)
  .fromTo(Text1,
    { y: yVal, opacity: 0 },
    { y: 0, opacity: 1, duration, ease: "power3.inOut", stagger: 0.05 },
    `<`
  );
}
