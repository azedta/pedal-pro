"use strict";

import { PP_STORAGE_KEY } from "./pp-core.js";

const defaultState = {
  expertName: "",
  expertServices: [],
  service: "",
  length: "",
  date: "",
  time: "",
  customer: { firstName: "", lastName: "", email: "" },
};

export function readBooking() {
  try {
    const raw = localStorage.getItem(PP_STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      customer: { ...defaultState.customer, ...(parsed.customer ?? {}) },
    };
  } catch {
    return { ...defaultState };
  }
}

export function writeBooking(next) {
  const state = {
    ...defaultState,
    ...next,
    customer: { ...defaultState.customer, ...(next.customer ?? {}) },
  };
  localStorage.setItem(PP_STORAGE_KEY, JSON.stringify(state));
  return state;
}

export function patchBooking(patch) {
  return writeBooking({ ...readBooking(), ...patch });
}

export function resetBooking() {
  localStorage.removeItem(PP_STORAGE_KEY);
}
