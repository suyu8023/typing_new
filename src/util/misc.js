export function genTimeFlag(expires) {
  return {
    _t: Date.now(),
    _et: Date.now() + expires,
  };
}

export function isStateExpired(savedState) {
  return !savedState || !savedState._et || savedState._et < Date.now();
}

export function clearExpiredStateProperties(state) {
  const newState = {};
  for (const key in state) {
    if (state.hasOwnProperty(key) && !isStateExpired(state[key])) {
      newState[key] = state[key];
    }
  }
  return newState;
}
