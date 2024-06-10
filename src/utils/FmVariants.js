export const cardVariants = {
    offscreen:  { opacity: 0, y: 100 },
    onscreen:   { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8, delay: 0.5 } }
};

export const titleVariants = {
    offscreen:  { opacity: 0     },
    onscreen:   { opacity: 1, transition: {   type: "spring", bounce: 0.4,    duration: 0.8,  delay: 0.5  }
    }
};

export const staggerVariants = {
    onscreen:   { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
    offscreen:  { transition: { staggerChildren: 0.12, staggerDirection: -1 } }
};

export const tileVariants = {
    onscreen:   { y: 0,     opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 }, type: "spring", bounce: 0.4, duration: 0.8, delay: 0.5 } },
    offscreen:  { y: 20,    opacity: 0, transition: { y: { stiffness: 1000 } } }
};

export const tileSmallVariants = {
    onscreen:   { y: 0,     opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 }, type: "spring", bounce: 0.4, duration: 0.8, delay: 0.5 } },
    offscreen:  { y: 15,    opacity: 0, transition: { y: { stiffness: 1000 } } }
};

export const tile_Left2right = {
    onscreen:   { x: 0,     opacity: 1, transition: { x: { stiffness: 1000, velocity: -100 }, type: "spring", bounce: 0.4, duration: 0.8, delay: 0.5 } },
    offscreen:  { x: -100,  opacity: 0, transition: { x: { stiffness: 1000 } } }
};

export const tile_right2Left = {
    onscreen:   { x: 0,     opacity: 1, transition: { x: { stiffness: 1000, velocity: -100 }, type: "spring", bounce: 0.4, duration: 0.8, delay: 0.5 } },
    offscreen:  { x: 100,   opacity: 0, transition: { x: { stiffness: 1000 } } }
};

export const tabContentVariant = {
    active:     { display: "block", transition: { staggerChildren: 0.2 } },
    inactive:   { display: "none" }
};

export const cardVariant = {
    active:     { opacity: 1, y: 0,     transition: { duration: 0.5 } },
    inactive:   { opacity: 0, y: 10,    transition: { duration: 0.5 } }
};

