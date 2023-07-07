window.addEventListener("load", () => {
  console.log("Page loaded");
});

export function validate(input) {
  const inputType = input.dataset.tipo;
  if (validators[inputType]) {
    validators[inputType](input);
  }
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = 
      showErrorMessages(inputType, input);
  }
}

const typeErrors = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const errorMessages = {
  name: {
    valueMissing: "Debes de proporcionar un nombre de usuario",
  },
  email: {
    valueMissing: "Debes de proporcionar un email de contacto",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "Debes de definir una contraseña para tu acceso",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula y un número",
  },
  birth: {
    valueMissing: "Debes de comprobar tu mayoría de edad",
    customError: "Debes de tener al menos 18 años de edad",
  },
  number: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es de 10 números"
  },
  address: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe de contener mínimo 10 caracteres máximo 40"
  },
  city: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe de contener mínimo 5 caracteres máximo 20"
  },
  estate: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe de contener mínimo 5 caracteres máximo 20"
  }
};

const validators = {
  birth: (input) => validateAge(input),
};

function showErrorMessages(inputType, input) {
  let message = "";
  typeErrors.forEach((error) => {
    if (input.validity[error]) {
      // console.log(inputType, error);
      // console.log(input.validity[error]);
      // console.log(errorMessages[inputType][error]);
      message = errorMessages[inputType][error];
    }
  });
  console.log(message)
  return message;
}


function validateAge(input) {
  const clientDate = new Date(input.value);
  let message = "";

  if (!legalAge(clientDate)) {
    message = "Debes de tener al menos 18 años de edad";
  }
  input.setCustomValidity(message);
}

function legalAge(date) {
  const today = new Date();

  const compareDates = new Date(
    date.getUTCFullYear() + 18,
    date.getUTCMonth(),
    date.getUTCDate()
  );
  return compareDates <= today;
}
