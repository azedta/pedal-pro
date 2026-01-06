"use strict";

/** Pedal Pro: small production-grade helpers (safe, fast, reusable) */

export const PP_STORAGE_KEY = "pp_booking_v1";

export function $(sel, root = document) {
  return root.querySelector(sel);
}
export function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

export function clampStr(s, max = 120) {
  return String(s ?? "")
    .trim()
    .slice(0, max);
}

export function toTitleCase(text) {
  const t = String(text ?? "").trim();
  if (!t) return "";
  return t
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Minimal toast system (no libs) */
export function ensureToastHost() {
  let host = document.querySelector(".pp-toast-host");
  if (!host) {
    host = document.createElement("div");
    host.className = "pp-toast-host";
    document.body.appendChild(host);
  }
  return host;
}

export function toast({ title = "Notice", message = "", timeout = 2800 } = {}) {
  const host = ensureToastHost();

  const el = document.createElement("div");
  el.className = "pp-toast";
  el.innerHTML = `
    <div class="pp-toast__row">
      <div>
        <p class="pp-toast__title">${escapeHtml(title)}</p>
        <p class="pp-toast__msg">${escapeHtml(message)}</p>
      </div>
      <button class="pp-toast__x" aria-label="Close">×</button>
    </div>
  `;

  const close = () => {
    el.style.transition = "opacity 200ms ease, transform 200ms ease";
    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";
    window.setTimeout(() => el.remove(), 220);
  };

  el.querySelector(".pp-toast__x").addEventListener("click", close);
  host.appendChild(el);

  if (timeout > 0) window.setTimeout(close, timeout);
}

export function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
