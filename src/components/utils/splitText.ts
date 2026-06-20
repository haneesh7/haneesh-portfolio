import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

function splitIntoWords(el: HTMLElement): HTMLElement[] {
  if (el.getAttribute("data-split") === "true") {
    el.textContent = el.getAttribute("data-original-text");
  } else {
    el.setAttribute("data-original-text", el.textContent || "");
    el.setAttribute("data-split", "true");
  }

  const spans: HTMLElement[] = [];

  const wordSplitter = (text: string) => {
    const nodes: Node[] = [];
    const words = text.split(" ");
    words.forEach((word, i) => {
      if (word !== "") {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        spans.push(span);
        nodes.push(span);
      }
      if (i < words.length - 1) {
        nodes.push(document.createTextNode(" "));
      }
    });
    return nodes;
  };


  const childNodes = Array.from(el.childNodes);
  el.textContent = "";

  childNodes.forEach((child) => {
    const splitNodes = splitTextNode(child, wordSplitter);
    splitNodes.forEach((node) => el.appendChild(node));
  });

  return spans;
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras = document.querySelectorAll<HTMLElement>(".para");
  const titles = document.querySelectorAll<HTMLElement>(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    para.classList.add("visible");
    const words = splitIntoWords(para);
    gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title) => {
    const chars = splitIntoChars(title);
    gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });
}
