/// <reference types="vite/client" />

declare module "gsap-trial/SplitText" {
  export class SplitText {
    constructor(target: any, vars: any);
    revert(): void;
    words: any[];
    chars: any[];
    lines: any[];
  }
}

declare module "gsap-trial/ScrollSmoother" {
  export class ScrollSmoother {
    static create(vars: any): ScrollSmoother;
    static refresh(value?: boolean): void;
    scrollTop(value?: number): number;
    paused(value?: boolean): any;
    scrollTo(target: any, smooth?: boolean, position?: string): void;
  }
}

