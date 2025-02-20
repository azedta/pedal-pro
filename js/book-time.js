"use strict";
const name = localStorage.getItem("expertName");
const services = localStorage.getItem("services").split(",");
const service = localStorage.getItem("service");
const length = localStorage.getItem("length");

console.log(name, services, service, length);

const expertName = document.querySelector(".expert-name");
expertName.innerHTML = name;

const bookingService = document.querySelector(".service-name");
bookingService.innerHTML = toTitleCase(service);

function toTitleCase(text) {
  text = text.toLowerCase().split(" ");
  for (let i = 0; i < text.length; i++) {
    text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1);
  }
  return text.join(" ");
}
