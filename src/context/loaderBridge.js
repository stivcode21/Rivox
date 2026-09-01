let startRequest = () => {};
let stopRequest = () => {};

export const bindLoader = (handlers) => {
  startRequest = handlers.start;
  stopRequest = handlers.stop;
};

export const notifyLoaderStart = () => startRequest();
export const notifyLoaderStop = () => stopRequest();
