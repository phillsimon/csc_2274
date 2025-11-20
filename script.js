// ===== Load common header/footer =====
async function loadHTML(id, file, callback) {
  const el = document.getElementById(id);
  if (!el) return;

  const resp = await fetch(file);
  el.innerHTML = await resp.text();

  if (typeof callback === "function") {
    callback();
  }
}

function initHamburger() {
  const hamMenu =
    document.querySelector(".ham-menu") ||
    document.querySelector(".hamburger");

  const offScreenMenu = document.querySelector(".off-screen-menu");

  if (hamMenu && offScreenMenu) {
    // Toggle open/close when clicking the hamburger
    hamMenu.addEventListener("click", () => {
      hamMenu.classList.toggle("active");
      offScreenMenu.classList.toggle("active");
    });

    // Close menu when clicking ANY link inside it
    const menuLinks = offScreenMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamMenu.classList.remove("active");
        offScreenMenu.classList.remove("active");
      });
    });
  }
  // Close menu when clicking outside of area
  document.addEventListener("click", (e) => {
    if (
      !offScreenMenu.contains(e.target) &&
      !hamMenu.contains(e.target)
    ) {
      hamMenu.classList.remove("active");
      offScreenMenu.classList.remove("active");
    }
  });
}



// Load header, then wire up hamburger
loadHTML("header", "header.html", initHamburger);
// Footer doesn’t need the callback:
loadHTML("footer", "footer.html");


// ===== Validation =====
const form = document.getElementById("contact-form");

if (form) {
  const emaildata = document.getElementById("email");
  const phonedata = document.getElementById("phone");
  const emailErr = document.getElementById("email-error");
  const phoneErr = document.getElementById("phone-error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function validateEmail() {
    const value = emaildata.value.trim();
    const isValid = emailRegex.test(value);
    emaildata.setCustomValidity(
      isValid ? "" : "Please enter a valid email (e.g., name@example.com)."
    );
    if (emailErr) emailErr.textContent = emaildata.validationMessage;
    return isValid;
  }

  function validatePhone() {
    const rawDigits = phonedata.value.replace(/\D/g, ""); // remove non-digits

    // Step 1: Must have exactly 10 digits
    if (rawDigits.length !== 10) {
      phonedata.setCustomValidity("Phone must contain exactly 10 digits.");
      if (phoneErr) phoneErr.textContent = phonedata.validationMessage;
      return false;
    }

    // Step 2: Must match one of the allowed formats
    const phonePattern =
      /^(?:\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4}|\(\d{3}\)[-.\s]\d{3}[-.\s]\d{4})$/;

    const isValid = phonePattern.test(phonedata.value);
    phonedata.setCustomValidity(
      isValid
        ? ""
        : "Phone format must be 1234567890, 123-456-7890, 123.456.7890, or (123)456-7890."
    );
    if (phoneErr) phoneErr.textContent = phonedata.validationMessage;
    return isValid;
  }

  // Live validation
  if (emaildata) emaildata.addEventListener("input", validateEmail);
  if (phonedata) phonedata.addEventListener("input", validatePhone);

  // On submit validation
  form.addEventListener("submit", (e) => {
    const okEmail = validateEmail();
    const okPhone = validatePhone();

    if (!okEmail || !okPhone) {
      e.preventDefault();
      if (!okEmail) emaildata.reportValidity();
      else phonedata.reportValidity();
    }
  });
}