"use strict";

import { $, toTitleCase, toast } from "./pp-core.js";
import { readBooking } from "./booking-store.js";

(function init() {
  const b = readBooking();

  const bookingLength = $(".booking-length");
  if (bookingLength) bookingLength.textContent = b.length || "—";

  const expertName = $(".expert-name");
  if (expertName) expertName.textContent = b.expertName || "—";

  const bookingService = $(".service-name");
  if (bookingService)
    bookingService.textContent = toTitleCase(b.service || "—");

  const userName = $(".user-full-name");
  if (userName)
    userName.textContent = toTitleCase(
      `${b.customer?.firstName || ""} ${b.customer?.lastName || ""}`.trim() ||
        "—"
    );

  const userEmail = $(".user-email");
  if (userEmail) userEmail.textContent = b.customer?.email || "—";

  // Optional: If your HTML has placeholders for date/time, fill them
  const dateEl = document.querySelector(".booking-date");
  if (dateEl) dateEl.textContent = b.date || "—";

  const timeEl = document.querySelector(".booking-time");
  if (timeEl) timeEl.textContent = b.time || "—";

  toast({
    title: "Booking confirmed",
    message: "A confirmation summary is ready. (Demo flow)",
    timeout: 2600,
  });
})();
