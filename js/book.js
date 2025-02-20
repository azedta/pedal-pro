"use strict";

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

const ethanBtn = document.querySelector(".ethan-book-btn");
const liamBtn = document.querySelector(".liam-book-btn");
const maxwelBtn = document.querySelector(".maxwel-book-btn");
const oliverBtn = document.querySelector(".oliver-book-btn");
const expertName = document.querySelector(".expert-name");
let expertSelected;

ethanBtn.addEventListener("click", (e) => {
  localStorage.setItem("expertName", experts.expert1.expertName);
  localStorage.setItem("services", experts.expert1.services);
});

liamBtn.addEventListener("click", (e) => {
  localStorage.setItem("expertName", experts.expert2.expertName);
  localStorage.setItem("services", experts.expert2.services);
});

maxwelBtn.addEventListener("click", (e) => {
  localStorage.setItem("expertName", experts.expert3.expertName);
  localStorage.setItem("services", experts.expert3.services);
});

oliverBtn.addEventListener("click", (e) => {
  localStorage.setItem("expertName", experts.expert4.expertName);
  localStorage.setItem("services", experts.expert4.services);
});
