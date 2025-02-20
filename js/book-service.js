"use strict";

let name = localStorage.getItem("expertName");
let services = localStorage.getItem("services").split(",");
// console.log(name);
// console.log(services);

const expertName = document.querySelector(".expert-name");
expertName.innerHTML = name;

const servicesNamesListed = document.querySelectorAll(".service-name");
const servicesListed = document.querySelectorAll(".repair-item");

// console.log(servicesListed);

servicesListed.forEach((item) => {
  // console.log(item.innerText.split("\n")[0]);
  if (!services.includes(item.innerText.split("\n")[0])) {
    item.classList.add("d-none");
  }
});

function respondToNext() {
  let val;
  const vals = document.querySelectorAll(".list-group-item-check");
  vals.forEach((item) => {
    if (item.checked) {
      val = item.id;
    }
  });

  const elementSelected = document.querySelector("label[for=" + val + "]");

  const serviceSelected = elementSelected
    .getElementsByClassName("service-name")[0]
    .innerHTML.trim();
  console.log(serviceSelected);

  let service, length;

  if (serviceSelected == "WHEELS") {
    service = "WHEELS";
    length = "45 minutes";
  } else if (serviceSelected == "PEDALS &amp; BRAKES") {
    service = "PEDALS & BRAKES";
    length = "60 minutes";
  } else if (serviceSelected == "CASETTE") {
    service = "CASETTE";
    length = "20 minutes";
  } else if (serviceSelected == "FRAME") {
    service = "FRAME";
    length = "20 minutes";
  }

  localStorage.setItem("service", service);
  localStorage.setItem("length", length);
}
