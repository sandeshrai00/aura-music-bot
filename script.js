const qr = document.getElementById("qrImage");
const label = document.getElementById("selectedLabel");
const amountLabel = document.getElementById("amountLabel");
const buttons = document.querySelectorAll(".preset-amounts button");

function changeQR(btn, image, text) {
  qr.style.opacity = "0";

  setTimeout(() => {
    qr.src = "img/" + image;
    qr.style.opacity = "1";
  }, 150);

  label.textContent = `Selected: ${text} QR`;
  amountLabel.textContent = `Amount: ${text}`;

  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// Always default to $2
window.addEventListener("DOMContentLoaded", () => {
  qr.src = "img/2us.jpg";
  label.textContent = "Selected: $2 QR";
  amountLabel.textContent = "Amount: $2";
});

// Accordion behavior
function toggleCrypto(type) {
  const usdt = document.getElementById("usdt-box");
  const bnb = document.getElementById("bnb-box");

  if (type === "usdt") {
    usdt.classList.toggle("show");
    bnb.classList.remove("show");
  }

  if (type === "bnb") {
    bnb.classList.toggle("show");
    usdt.classList.remove("show");
  }
}

function copyAddress() {
  const address = "0x316278cc4085552abc0f1e25aaf62ab78e2b2d83";
  navigator.clipboard.writeText(address);

  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}