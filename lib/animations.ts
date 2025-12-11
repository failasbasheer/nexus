import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const registerScrollTrigger = () => {
  gsap.registerPlugin(ScrollTrigger);
}

// --- HELPER: Split Text into Spans for Animation ---
const splitTextIntoSpans = (element: HTMLElement) => {
  if (!element) return;
  const originalText = element.innerText;

  // Split by space to get words
  const words = originalText.split(" ");

  // Clear content
  element.innerHTML = "";

  const spans: HTMLElement[] = [];

  words.forEach((word, i) => {
    if (!word) return;
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(15px)';
    span.style.willChange = 'transform, opacity';

    element.appendChild(span);
    spans.push(span);

    // Restore spacing
    if (i < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });

  return spans;
};

// --- EXPORT: Word-by-Word Animation ---
export const animateTextWordByWord = (
  element: HTMLElement | null,
  options: { delay?: number; duration?: number; stagger?: number; start?: string; trigger?: Element | null } = {}
) => {
  if (!element) return;

  const spans = splitTextIntoSpans(element);
  if (!spans || spans.length === 0) return;

  const { delay = 0, duration = 0.6, stagger = 0.015, start = "top 85%", trigger = element } = options;

  return gsap.to(spans, {
    opacity: 1,
    y: 0,
    duration: duration,
    stagger: stagger,
    delay: delay,
    ease: "power2.out",
    scrollTrigger: {
      trigger: trigger || element,
      start: start,
      toggleActions: "play none none none"
    }
  });
};

// Standard fade-up animation for sections
export const animateFadeUp = (
  element: HTMLElement | null,
  options: { delay?: number; duration?: number; y?: number; start?: string; trigger?: Element | null } = {}
) => {
  if (!element) return;

  const { delay = 0, duration = 1.0, y = 40, start = "top 85%", trigger = element } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, y: y, filter: "blur(20px)" }, // Stronger initial blur
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: duration,
      delay: delay,
      ease: "power4.out", // Snappier, more premium easing
      scrollTrigger: {
        trigger: trigger || element,
        start: start,
        toggleActions: "play none none none",
      },
    }
  );
};

// Staggered list animation (for features, testimonials, logos)
export const animateStaggeredList = (
  container: HTMLElement | null,
  itemSelector: string, // e.g., ".feature-item"
  options: { stagger?: number; delay?: number } = {}
) => {
  if (!container) return;

  const items = container.querySelectorAll(itemSelector);
  if (items.length === 0) return;

  const { stagger = 0.1, delay = 0 } = options;

  return gsap.fromTo(
    items,
    { opacity: 0, y: 30, filter: "blur(5px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
};

// Animate direct children of a container (perfect for grids)
export const animateStaggeredChildren = (
  container: HTMLElement | null,
  options: { stagger?: number; delay?: number; y?: number } = {}
) => {
  if (!container) return;

  const { stagger = 0.1, delay = 0, y = 40 } = options;
  const children = Array.from(container.children);

  if (children.length === 0) return;

  return gsap.fromTo(
    children,
    { opacity: 0, y: y, filter: "blur(5px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
};

// Parallax effect for backgrounds or images
export const animateParallax = (
  element: HTMLElement | null,
  intensity: number = 50, // pixels to move
  trigger?: HTMLElement | null
) => {
  if (!element) return;

  return gsap.to(element, {
    y: -intensity,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Complex Hero Intro Sequence (No ScrollTrigger, purely entrance)
export const animateHeroIntro = (
  badge: HTMLElement | null,
  title: HTMLElement | null,
  description: HTMLElement | null,
  buttons: HTMLElement | null,
  visual: HTMLElement | null
) => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (badge) tl.fromTo(badge, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });

  if (title) {
    tl.fromTo(title, { opacity: 0, y: 40, filter: "blur(12px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, "-=0.6");
  }

  // UPDATED: Word-by-word for hero description
  if (description) {
    const spans = splitTextIntoSpans(description);
    if (spans && spans.length > 0) {
      tl.to(spans, { opacity: 1, y: 0, duration: 0.6, stagger: 0.01 }, "-=0.8");
    } else {
      // Fallback if split failed or empty
      tl.fromTo(description, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8");
    }
  }

  if (buttons) {
    tl.fromTo(buttons, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8");
  }

  if (visual) {
    tl.fromTo(visual,
      { opacity: 0, scale: 0.95, y: 40, rotationX: 10 },
      { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 1.4, ease: "power4.out" },
      "-=1.0"
    );
  }

  return tl;
};