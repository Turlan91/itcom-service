/*
  НАСТРОЙКА САЙТА ITCOM SERVICE
  1. Впишите номер WhatsApp ниже: только цифры, с кодом страны.
     Пример формата для Казахстана: 7XXXXXXXXXX (это пример, не реальный номер).
  2. Сохраните файл и загрузите его вместе с index.html.
*/
const WHATSAPP_NUMBER = "77024266120"; // Например: "7XXXXXXXXXX" — замените на свой номер

const phoneDisplay = document.getElementById("phone-display");
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

function whatsappUrl(message = "") {
  if (!WHATSAPP_NUMBER || !/^\d{8,15}$/.test(WHATSAPP_NUMBER)) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

function showPhone() {
  if (phoneDisplay && WHATSAPP_NUMBER && /^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
    phoneDisplay.textContent = "+" + WHATSAPP_NUMBER;
  }
}
showPhone();

document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.addEventListener("click", event => {
    const url = whatsappUrl("Здравствуйте! Пишу с сайта Itcom Service.");
    if (url) {
      event.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (link.getAttribute("href") !== "#contacts") {
      event.preventDefault();
      document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
      alert("");
    }
  });
});

const form = document.getElementById("request-form");
form?.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const service = document.getElementById("service").value;
  const details = document.getElementById("message").value.trim();
  const parts = [
    "Здравствуйте! Пишу с сайта Itcom Service.",
    name ? `Меня зовут: ${name}.` : "",
    `Услуга: ${service}.`,
    details ? `Подробности: ${details}` : ""
  ].filter(Boolean);
  const url = whatsappUrl(parts.join("\n"));
  if (!url) {
    alert("Форма готова, но WhatsApp пока не подключён. Откройте script.js и укажите свой номер в строке WHATSAPP_NUMBER.");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
});
