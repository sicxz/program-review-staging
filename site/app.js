const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".question-card");
const noteFields = document.querySelectorAll("[data-note]");
const checkboxes = document.querySelectorAll("[data-check]");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const tag = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === filter));
    cards.forEach((card) => {
      const tags = card.dataset.tags || "";
      card.classList.toggle("is-hidden", tag !== "all" && !tags.includes(tag));
    });
  });
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copyTarget);
    if (!source) return;

    const text = (source.value || source.textContent || "").trim();

    try {
      await navigator.clipboard.writeText(text);
      flashButton(button, "Copied");
    } catch {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(source);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
      flashButton(button, "Copied");
    }
  });
});

noteFields.forEach((field) => {
  const key = `desn-self-study:${field.dataset.note}`;
  field.value = localStorage.getItem(key) || "";
  field.addEventListener("input", () => localStorage.setItem(key, field.value));
});

checkboxes.forEach((box) => {
  const key = `desn-self-study:${box.dataset.check}`;
  box.checked = localStorage.getItem(key) === "true";
  box.addEventListener("change", () => localStorage.setItem(key, String(box.checked)));
});

function flashButton(button, label) {
  const original = button.querySelector("span")?.textContent || button.textContent;
  const span = button.querySelector("span");

  if (span) {
    span.textContent = label;
  } else {
    button.textContent = label;
  }

  window.setTimeout(() => {
    if (span) {
      span.textContent = original;
    } else {
      button.textContent = original;
    }
  }, 1200);
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
