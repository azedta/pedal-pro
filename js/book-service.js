"use strict";

import { toast } from "./pp-core.js";
import { readBooking, patchBooking } from "./booking-store.js";

const SERVICE_META = {
  WHEELS: { length: "45 minutes" },
  "PEDALS & BRAKES": { length: "60 minutes" },
  CASETTE: { length: "20 minutes" },
  FRAME: { length: "20 minutes" },
};

function normalizeService(text) {
  return String(text || "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function setContinueEnabled(enabled) {
  const btn = document.getElementById("ppContinueBtn");
  if (!btn) return;

  if (enabled) {
    btn.classList.remove("pp-disabled");
    btn.setAttribute("aria-disabled", "false");
  } else {
    btn.classList.add("pp-disabled");
    btn.setAttribute("aria-disabled", "true");
  }
}

function setExpertName() {
  const booking = readBooking();
  const el = document.querySelector(".expert-name");
  if (el) el.textContent = booking.expertName || "—";
}

function filterServicesForExpert() {
  const booking = readBooking();
  const allowed = new Set(
    (booking.expertServices || []).map((s) => normalizeService(s))
  );

  if (!booking.expertName) {
    toast({
      title: "Select a specialist first",
      message: "Please choose a specialist before selecting a service.",
      timeout: 2400,
    });
    window.location.assign("book.html");
    return;
  }

  if (!allowed.size) return;

  document.querySelectorAll(".repair-item").forEach((label) => {
    const nameEl = label.querySelector(".service-name");
    const service = normalizeService(
      nameEl?.innerHTML || nameEl?.textContent || ""
    );

    const inputId = label.getAttribute("for");
    const input = inputId ? document.getElementById(inputId) : null;

    if (!allowed.has(service)) {
      label.classList.add("d-none");
      if (input && input.checked) input.checked = false;
    } else {
      label.classList.remove("d-none");
    }
  });

  // If after filtering nothing is checked, that's OK — user must choose.
}

function getSelectedService() {
  const checked = document.querySelector(".list-group-item-check:checked");
  if (!checked) return null;

  const label = document.querySelector(`label[for="${checked.id}"]`);
  if (!label || label.classList.contains("d-none")) return null;

  const nameEl = label.querySelector(".service-name");
  const service = normalizeService(
    nameEl?.innerHTML || nameEl?.textContent || ""
  );
  return service || null;
}

(function init() {
  setExpertName();
  filterServicesForExpert();

  // Start disabled until user picks something
  setContinueEnabled(false);

  // When user selects a service, save it immediately and enable continue
  document.addEventListener("change", (e) => {
    if (!e.target?.classList?.contains("list-group-item-check")) return;

    const service = getSelectedService();
    if (!service || !SERVICE_META[service]) {
      setContinueEnabled(false);
      return;
    }

    patchBooking({ service, length: SERVICE_META[service].length });
    setContinueEnabled(true);

    toast({
      title: "Service selected",
      message: `${service} • ${SERVICE_META[service].length}`,
      timeout: 1200,
    });
  });

  // Block continue click if disabled (bulletproof)
  const btn = document.getElementById("ppContinueBtn");
  if (btn) {
    btn.addEventListener("click", (e) => {
      const disabled =
        btn.classList.contains("pp-disabled") ||
        btn.getAttribute("aria-disabled") === "true";

      if (disabled) {
        e.preventDefault();
        toast({
          title: "Pick a service",
          message: "Select one service to continue.",
          timeout: 2200,
        });
        return;
      }

      // Ensure saved (in case user somehow skipped change event)
      const service = getSelectedService();
      if (!service || !SERVICE_META[service]) {
        e.preventDefault();
        setContinueEnabled(false);
        toast({
          title: "Pick a service",
          message: "Select one service to continue.",
          timeout: 2200,
        });
        return;
      }

      patchBooking({ service, length: SERVICE_META[service].length });
    });
  }
})();
