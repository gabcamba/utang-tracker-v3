export const addFabSpring = {
  from: { y: -190 },
  to: { y: 0 },
  config: {
    mass: 2,
    tension: 400,
  },
};

export const deleteFabSpring = {
  from: { y: 190 },
  to: { y: 0 },
  config: {
    mass: 2,
    tension: 400,
  },
};

export const createUtangSpring = {
  from: { y: 500 },
  to: { y: 0 },
  config: {
    mass: 1.5,
    friction: 25,
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
