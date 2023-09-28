import { getInput } from "./js/parsing-functions";

const initialSetup = () => {
  // Wait until after animation to change background color
  const svg = document.querySelector("svg");
  const input = document.getElementById("search-input");
  setTimeout(() => {
    input.setAttribute("placeholder", "Enter a city or zip");
  }, 4000);

  // Set up listener for search
  const form = document.getElementById("form");
  form.addEventListener("submit", getInput);
};

initialSetup();
