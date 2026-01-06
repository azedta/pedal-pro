"use strict";

import { $, clampStr, toast, toTitleCase } from "./pp-core.js";
import { readBooking, patchBooking } from "./booking-store.js";

(function bootstrapValidation() {
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
})();

(function init() {
  const booking = readBooking();

  // Fill summary panel if present
  const bookingLength = $(".booking-length");
  if (bookingLength) bookingLength.textContent = booking.length || "—";

  const expertName = $(".expert-name");
  if (expertName) expertName.textContent = booking.expertName || "—";

  const bookingService = $(".service-name");
  if (bookingService)
    bookingService.textContent = toTitleCase(booking.service || "—");

  // Guard if user skipped steps
  if (!booking.expertName || !booking.service || !booking.time) {
    toast({
      title: "Almost there",
      message:
        "Make sure you selected expert, service, and time before confirming.",
      timeout: 3600,
    });
  }

  const form = document.querySelector("form.needs-validation");
  if (!form) return;

  const submitBtn = document.getElementById("submit--user-details-form");

  function setSubmitEnabled(enabled) {
    if (!submitBtn) return;
    submitBtn.disabled = !enabled;
    submitBtn.classList.toggle("pp-disabled", !enabled);
  }

  function isFormValid() {
    return form.checkValidity();
  }

  // Initial state
  setSubmitEnabled(isFormValid());

  // Enable/disable live as user types/selects
  form.addEventListener("input", () => setSubmitEnabled(isFormValid()));
  form.addEventListener("change", () => setSubmitEnabled(isFormValid()));

  form.addEventListener("submit", () => {
    // if invalid, bootstrapValidation already prevented submit
    if (!form.checkValidity()) {
      setSubmitEnabled(false);
      return;
    }

    const firstName = $("#inputFirstName");
    const lastName = $("#inputLastName");
    const email = $("#inputEmail4");

    const f = clampStr(firstName?.value, 60);
    const l = clampStr(lastName?.value, 60);
    const em = clampStr(email?.value, 120);

    patchBooking({
      customer: { firstName: f, lastName: l, email: em },
    });

    toast({
      title: "Details saved",
      message: "Confirming your booking…",
      timeout: 1400,
    });
  });

  // keep backward compatibility with inline onclick="storeInfo()"
  window.storeInfo = () => {};
})();
