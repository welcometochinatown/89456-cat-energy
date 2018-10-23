var form = document.querySelector("form");
var catName = form.querySelector("[name=cat-name]");
var catWeight = form.querySelector("[name=cat-weight]");
var catAge = form.querySelector("[name=cat-age]");
var email = form.querySelector("[name=email]");
var phone = form.querySelector("[name=phone]");
var feedback = form.querySelector("[name=feedback]");
var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("catName");
} catch {
  isStorageSupport = false;
}

form.addEventListener("submit", function (evt) {
  if (!catName.value || !catWeight.value || !catAge.value || !email.value || !phone.value || !feedback.value) {
    evt.preventDefault();
    form.classList.remove("error");
    form.offsetWidth = form.offsetWidth;
    form.classList.add("error");
  }
  else {
    if (isStorageSupport) {
      localStorage.setItem("catName", catName.value);
    }
  }

});
