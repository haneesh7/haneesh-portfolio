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

  const landingSelectors = [".landing-info h3", ".landing-info h2", ".landing-intro h2", ".landing-intro h1"];
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
}
