const header = document.getElementById("main-header");
const contents = document.getElementsByClassName("content");
const paragraphs = document.getElementsByTagName("p");
const firstLink = document.querySelector(".nav-link");
const allLinks = document.querySelectorAll(".nav-link");

console.log("getElementById:", header);
console.log("getElementsByClassName:", contents);
console.log("getElementsByTagName:", paragraphs);
console.log("querySelector:", firstLink);
console.log("querySelectorAll:", allLinks);
console.log("h1:", document.querySelector("h1"));
console.log("contact form:", document.querySelector("#contact-form"));
console.log("email input:", document.querySelector("#email"));
console.log("nav list items:", document.querySelectorAll(".nav-list li"));
console.log("last paragraph:", paragraphs[paragraphs.length - 1]);

const nav = document.querySelector("nav");
const article = document.querySelector("article");
const navList = document.querySelector(".nav-list");
const footer = document.querySelector("footer");
console.log("nav parent:", nav.parentElement);
console.log("nav children:", nav.children);
console.log("nav first/last child:", nav.firstElementChild, nav.lastElementChild);
console.log("article next/previous sibling:", article.nextElementSibling, article.previousElementSibling);
console.log("links inside nav:", nav.querySelectorAll("a"));
console.log("header nav:", header.querySelector("nav"));
console.log("first link parent li:", firstLink.parentElement);
console.log("article next sibling:", article.nextElementSibling);
console.log("ul child list items:", navList.querySelectorAll(":scope > li"));
console.log("footer up to body:", footer.parentElement.parentElement);

const title = document.querySelector(".title");
console.log("title textContent / innerText:", title.textContent, title.innerText);
console.log("article HTML written in this page:", article.innerHTML);
title.textContent = "Article Title — updated with textContent";
title.dataset.originalTitle = title.textContent;
title.classList.add("highlight");
title.setAttribute("title", "Updated with the DOM");
console.log("link href and target attribute:", firstLink.getAttribute("href"), firstLink.hasAttribute("target"));

function addNavItem(text, href) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.classList.add("nav-link");
  link.textContent = text;
  link.href = href;
  listItem.dataset.generated = "true";
  listItem.append(link);
  navList.append(listItem);
}

addNavItem("Practice", "#event-practice");
const clonedItem = navList.firstElementChild.cloneNode(true);
clonedItem.dataset.generated = "true";
clonedItem.querySelector("a").textContent = "Cloned Home";
clonedItem.querySelector("a").href = "#article";
navList.append(clonedItem);

document.querySelector("#remove-generated-links").addEventListener("click", () => {
  navList.querySelectorAll("[data-generated]").forEach((item) => item.remove());
});

let count = 0;
const counterValue = document.querySelector("#counter-value");

function updateCounter(nextCount) {
  count = Math.max(0, nextCount);
  counterValue.textContent = String(count);
}

document.querySelector("#increment").addEventListener("click", () => updateCounter(count + 1));
document.querySelector("#decrement").addEventListener("click", () => updateCounter(count - 1));
document.querySelector("#reset-counter").addEventListener("click", () => updateCounter(0));

const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const formResult = document.querySelector("#form-result");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFieldError(input, message) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.toggle("error", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  error.textContent = message;
}

nameInput.addEventListener("input", () => {
  setFieldError(nameInput, nameInput.value.trim().length < 2 ? "Name must be at least 2 characters." : "");
});

emailInput.addEventListener("input", () => {
  setFieldError(emailInput, emailPattern.test(emailInput.value.trim()) ? "" : "Please enter a valid email.");
});

function submitContactForm() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  setFieldError(nameInput, name.length < 2 ? "Name must be at least 2 characters." : "");
  setFieldError(emailInput, emailPattern.test(email) ? "" : "Please enter a valid email.");

  if (name.length >= 2 && emailPattern.test(email)) {
    formResult.textContent = "Form submitted successfully!";
    formResult.classList.add("success-message");
    contactForm.reset();
  } else {
    formResult.textContent = "";
    formResult.classList.remove("success-message");
  }
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitContactForm();
});

const shortcutMessage = document.querySelector("#shortcut-message");

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    shortcutMessage.textContent = "Saved!";
  }

  if (event.key === "Escape") {
    document.querySelectorAll("form").forEach((form) => form.reset());
    setFieldError(nameInput, "");
    setFieldError(emailInput, "");
    formResult.textContent = "";
    shortcutMessage.textContent = "Form inputs cleared.";
  }

  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    submitContactForm();
  }
});

const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = itemInput.value.trim();
  if (!text) {
    return;
  }

  const item = document.createElement("li");
  const label = document.createElement("span");
  const deleteButton = document.createElement("button");
  label.textContent = text;
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.textContent = "Delete";
  item.append(label, " ", deleteButton);
  itemList.append(item);
  itemInput.value = "";
});

itemList.addEventListener("click", (event) => {
  console.log("List click:", {
    target: event.target,
    currentTarget: event.currentTarget,
    type: event.type
  });
  const deleteButton = event.target.closest('button[data-action="delete"]');
  if (deleteButton && itemList.contains(deleteButton)) {
    deleteButton.closest("li").remove();
    return;
  }

  const item = event.target.closest("li");
  if (item && itemList.contains(item)) {
    item.classList.toggle("completed");
  }
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    console.log("Clicked link:", event.currentTarget.textContent);
  });
});
