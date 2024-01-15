export const handleFormFunctionality = () => {
  const form = document.querySelector(".form");
  const inputs = document.querySelectorAll<HTMLInputElement>(".form__input");

  let state: Record<string, string> = {};

  const showError = (target: string, message: string) => {
    const input = document.querySelector(`#${target}`);
    const parentElement = input?.closest(".form__item");
    const error = parentElement?.querySelector(".form__error");

    parentElement?.classList.add("error");

    if (!error) return;

    error.textContent = message;
  };

  const clearError = (target: string) => {
    const input = document.querySelector(`#${target}`);
    const parentElement = input?.closest(".form__item");
    const error = parentElement?.querySelector(".form__error");

    parentElement?.classList.remove("error");

    if (!error) return;

    error.textContent = "";
  };

  const isValidEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateState = () => {
    const { firstName, lastName, email, password } = state;
    let isFirstNameValid = true;
    let isLastNameValid = true;
    let isEmailValid = true;
    let isPasswordValid = true;

    if (firstName.length === 0) {
      isFirstNameValid = false;
      showError("firstName", "First name can't be empty!");
    }

    if (firstName.length < 3) {
      isFirstNameValid = false;
      showError("firstName", "First name must be minimum 3 characters!");
    }

    if (lastName.length === 0) {
      isLastNameValid = false;
      showError("lastName", "Last name can't be empty!");
    }

    if (lastName.length < 3) {
      isLastNameValid = false;
      showError("lastName", "Last name must be minimum 3 characters!");
    }

    if (email.length === 0) {
      isEmailValid = false;
      showError("email", "Email can't be empty!");
    }

    if (!isValidEmail(email)) {
      isEmailValid = false;
      showError("email", "Email is incorrect!");
    }

    if (password.length === 0) {
      isPasswordValid = false;
      showError("password", "Password is invalid!");
    }

    isFirstNameValid && clearError("firstName");
    isLastNameValid && clearError("lastName");
    isEmailValid && clearError("email");
    isPasswordValid && clearError("password");

    alert("Wysłano!");
    clearInputs();
  };

  const updateState = (target: HTMLInputElement) => {
    const type = target.id;
    state = { ...state, [type]: target.value };
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const setInitialState = () => {
    inputs.forEach((input) => {
      state = { ...state, [input.id]: "" };
    });
  };

  inputs.forEach((input) => {
    input.addEventListener("input", (ev) => {
      if (!(ev.target instanceof HTMLInputElement)) return;
      updateState(ev.target);
    });
  });

  form?.addEventListener("submit", (ev) => {
    ev.preventDefault();

    validateState();
  });

  setInitialState();
};
