window.addEventListener("load", () => {
  console.log("Page loaded");
});

const inputBday = document.querySelector("#birth");

inputBday.addEventListener("blur", (eve) => {
  validateAge(eve.target);
});

function validateAge(input) {
  const clientAge = new Date(input.value);
  let message = "";
  legalAge(clientAge);

  if (!legalAge(clientAge)) {
    message = "Debes de tener al menos 18 años de edad";
  }
  input.setCustomValidity(message);
}

function legalAge(date) {
  const today = new Date();

  const compareDates = new Date(
    date.getUTCFullYear() + 18,
    date.getUTCMonth(),
    date.getUTCDay()
  );
  return today >= compareDates;
}
