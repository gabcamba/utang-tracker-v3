export const createUtangSpring = {
  from: { y: 500 },
  to: { y: 0 },
  config: {
    mass: 1.5,
    friction: 25,
    tension: 200,
  },
};

export const menuSpring = {
  from: { backdropFilter: "blur(0px)", "-webkit-backdrop-filter": "blur(0px)" },
  to: { backdropFilter: "blur(40px)", "-webkit-backdrop-filter": "blur(40px)" },
  config: {
    mass: 2,
    friction: 35,
    tension: 200,
  },
};

export const listItemSpring = {
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0 },
  config: {
    mass: 2,
    tension: 400,
  },
};

export const utangItemSpring = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};
