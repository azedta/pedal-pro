"use strict";

import { toast, $all } from "./pp-core.js";
import { readBooking, patchBooking } from "./booking-store.js";

function pad2(n) {
  return String(n).padStart(2, "0");
}
function isoDate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function weekdayShort(d) {
  return d.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase();
}
function monthDay(d) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

(function init() {
  const booking = readBooking();

  // Guard: must come from service selection
  if (!booking?.service) {
    toast({
      title: "Pick a service first",
      message: "Please choose a service to continue.",
    });
    // window.location.assign("book-service.html");
  }

  const dateGrid = document.getElementById("ppDateGrid");
  const timeButtons = $all(".pp-time-btn");
  const continueBtn = document.getElementById("ppContinueBtn");

  let selectedDate = booking.date || "";
  let selectedTime = booking.time || "";

  // --- UI helpers ---
  function setContinueEnabled(enabled) {
    if (!continueBtn) return;
    if (enabled) {
      continueBtn.classList.remove("pp-disabled");
      continueBtn.setAttribute("aria-disabled", "false");
    } else {
      continueBtn.classList.add("pp-disabled");
      continueBtn.setAttribute("aria-disabled", "true");
    }
  }

  function setTimesEnabled(enabled) {
    timeButtons.forEach((btn) => {
      btn.disabled = !enabled;
      btn.classList.toggle("pp-times-disabled", !enabled);
    });
  }

  function clearTimeSelectionUI() {
    timeButtons.forEach((btn) => {
      btn.classList.remove("pp-is-selected");
      btn.classList.remove("btn-dark", "pp-btn-primary");
      btn.classList.add("btn-outline-dark", "pp-btn-ghost");
    });
  }

  function selectTime(btn, time) {
    clearTimeSelectionUI();

    btn.classList.add("pp-is-selected");
    btn.classList.remove("btn-outline-dark", "pp-btn-ghost");
    btn.classList.add("btn-dark", "pp-btn-primary");

    selectedTime = time;
    patchBooking({ time: selectedTime, date: selectedDate });

    toast({
      title: "Time selected",
      message: `${selectedDate} • ${selectedTime}`,
      timeout: 1200,
    });
    setContinueEnabled(true);
  }

  function renderDates() {
    if (!dateGrid) return;

    const now = new Date();
    const days = [];

    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      days.push(d);
    }

    dateGrid.innerHTML = days
      .map((d) => {
        const iso = isoDate(d);
        const isSelected = iso === selectedDate;
        return `
          <button
            type="button"
            class="pp-date-btn ${isSelected ? "pp-is-selected" : ""}"
            data-iso="${iso}"
            aria-pressed="${isSelected ? "true" : "false"}"
          >
            <div class="pp-date-top">
              <span class="pp-date-dow">${weekdayShort(d)}</span>
              <span class="pp-date-md">${monthDay(d)}</span>
            </div>
          </button>
        `;
      })
      .join("");

    // wire clicks
    $all("#ppDateGrid .pp-date-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const iso = btn.getAttribute("data-iso");
        if (!iso) return;

        // update selected
        selectedDate = iso;

        // re-render to update selected appearance
        renderDates();

        // enable time selection after date pick
        setTimesEnabled(true);

        // selecting a new date resets time selection
        selectedTime = "";
        patchBooking({ date: selectedDate, time: "" });
        clearTimeSelectionUI();
        setContinueEnabled(false);

        toast({ title: "Date selected", message: selectedDate, timeout: 1200 });
      });
    });
  }

  // --- Time wiring ---
  timeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!selectedDate) {
        toast({
          title: "Pick a date first",
          message: "Choose a date before selecting a time.",
        });
        return;
      }
      const time = btn.textContent.trim();
      if (!time) return;
      selectTime(btn, time);
    });
  });

  // --- Continue should be blocked unless time selected ---
  if (continueBtn) {
    continueBtn.addEventListener("click", (e) => {
      const disabled =
        continueBtn.classList.contains("pp-disabled") ||
        continueBtn.getAttribute("aria-disabled") === "true";
      if (disabled || !selectedTime) {
        e.preventDefault();
        toast({
          title: "Pick a time",
          message: "Select a time slot to continue.",
          timeout: 2200,
        });
        return;
      }
      patchBooking({ date: selectedDate, time: selectedTime });
    });
  }

  // --- Initial state ---
  renderDates();

  // If we already have a stored date, enable times; otherwise disable
  if (selectedDate) {
    setTimesEnabled(true);
  } else {
    setTimesEnabled(false);
  }

  // If we already have a stored time, mark continue enabled + highlight button
  if (selectedTime) {
    const match = timeButtons.find(
      (b) => b.textContent.trim() === selectedTime
    );
    if (match) {
      match.classList.remove("btn-outline-dark", "pp-btn-ghost");
      match.classList.add("btn-dark", "pp-btn-primary", "pp-is-selected");
    }
    setContinueEnabled(true);
  } else {
    setContinueEnabled(false);
  }
})();
