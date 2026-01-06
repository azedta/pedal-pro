"use strict";

import { toast } from "./pp-core.js";
import { patchBooking, resetBooking } from "./booking-store.js";

const experts = {
  expert1: {
    expertName: "Ethan Carter",
    services: ["WHEELS", "PEDALS & BRAKES"],
  },
  expert2: {
    expertName: "Liam Foster",
    services: ["WHEELS", "CASETTE", "FRAME"],
  },
  expert3: {
    expertName: "Maxwel Reed",
    services: ["WHEELS", "CASETTE", "FRAME"],
  },
  expert4: {
    expertName: "Oliver Grant",
    services: ["WHEELS", "PEDALS & BRAKES"],
  },
};

function wire(btnSelector, expert) {
  const btn = document.querySelector(btnSelector);
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    resetBooking();
    patchBooking({
      expertName: expert.expertName,
      expertServices: expert.services,
    });

    toast({
      title: "Expert Selected",
      message: `${expert.expertName} is ready. Choose your service next.`,
      timeout: 1400,
    });

    const href = btn.getAttribute("href") || "book-service.html";
    window.location.assign(href);
  });
}

wire(".ethan-book-btn", experts.expert1);
wire(".liam-book-btn", experts.expert2);
wire(".maxwel-book-btn", experts.expert3);
wire(".oliver-book-btn", experts.expert4);
