/* Tiny data-driven form renderer.
   Builds real, named form fields from a JS data array so the
   result posts cleanly to Formspree (or any form backend). */

const LETTERS = ["a","b","c","d","e","f","g","h"];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "text") node.textContent = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach(c => c && node.appendChild(c));
  return node;
}

function fieldWrap(q, isSub) {
  const attrs = { class: "field" + (isSub ? " sub" : ""), "data-id": q.id };
  if (q.showIf) attrs["data-show-if"] = q.showIf;
  return el("div", attrs);
}

function labelBlock(q) {
  const label = el("label", { class: "q", for: q.id, html: q.label + (q.required ? '<span class="req">*</span>' : "") });
  const wrap = [label];
  if (q.help) wrap.push(el("div", { class: "help", html: q.help }));
  return wrap;
}

function renderChoices(q, type) {
  const group = el("div", { class: "choices" });
  q.options.forEach((opt, i) => {
    const letter = LETTERS[i] || "";
    const id = `${q.id}_${i}`;
    const input = el("input", {
      type,
      name: type === "checkbox" ? `${q.name}[]` : q.name,
      id,
      value: opt,
    });
    if (q.required && type === "radio") input.required = true;
    const choice = el("label", { class: "choice", for: id }, [
      input,
      el("span", { class: "letter", style: `background:var(--letter-${letter})`, text: letter.toUpperCase() }),
      el("span", { class: "txt", text: opt }),
    ]);
    group.appendChild(choice);
  });
  return group;
}

// For any radio/checkbox/select question with an "Other" (or similarly
// open-ended, e.g. "Equivalent") option, add an optional free-text field
// that only shows once that option is selected.
const OPEN_ENDED_OPTION = /^(other|equivalent)\b/i;

function renderOtherDetail(q) {
  const opt = (q.options || []).find(o => OPEN_ENDED_OPTION.test(o));
  if (!opt) return null;
  const id = `${q.id}_other_detail`;
  const wrap = el("div", { class: "field sub", "data-show-if": `${q.name}:${opt}` });
  wrap.appendChild(el("label", { class: "q", for: id, text: `${opt} — feel free to type more (optional)` }));
  wrap.appendChild(el("input", { type: "text", name: `${q.name} (${opt.toLowerCase()}, specify)`, id, placeholder: "Optional" }));
  return wrap;
}

function renderScale(q) {
  const wrap = el("div", {});
  const pairs = q.rows || [q.label];
  (q.rows ? q.rows : [null]).forEach((row, ri) => {
    const rowWrap = el("div", { class: "scale-row" });
    if (row) rowWrap.appendChild(el("div", { class: "ends", html: row }));
    const opts = el("div", { class: "scale-opts" });
    for (let i = 1; i <= 5; i++) {
      const id = `${q.id}_${ri}_${i}`;
      const input = el("input", { type: "radio", name: `${q.name}${row ? `_${ri + 1}` : ""}`, id, value: i });
      opts.appendChild(el("label", { for: id }, [input, document.createTextNode(i)]));
    }
    rowWrap.appendChild(opts);
    wrap.appendChild(rowWrap);
  });
  return wrap;
}

function renderInput(q) {
  switch (q.type) {
    case "textarea":
      return el("textarea", { name: q.name, id: q.id, placeholder: q.placeholder || "", ...(q.required ? { required: "" } : {}) });
    case "radio":
      return renderChoices(q, "radio");
    case "checkbox":
      return renderChoices(q, "checkbox");
    case "scale":
      return renderScale(q);
    case "file":
      return el("input", { type: "file", name: q.name, id: q.id, multiple: "" });
    case "select": {
      const sel = el("select", { name: q.name, id: q.id, ...(q.required ? { required: "" } : {}) });
      sel.appendChild(el("option", { value: "", text: "Select…" }));
      q.options.forEach(o => sel.appendChild(el("option", { value: o, text: o })));
      return sel;
    }
    default: // text, email, tel, url, date, number
      return el("input", {
        type: q.type || "text",
        name: q.name,
        id: q.id,
        placeholder: q.placeholder || "",
        ...(q.required ? { required: "" } : {}),
      });
  }
}

function renderQuestion(q, isSub) {
  const wrap = fieldWrap(q, isSub);
  labelBlock(q).forEach(n => wrap.appendChild(n));
  wrap.appendChild(renderInput(q));
  if (q.type === "radio" || q.type === "checkbox" || q.type === "select") {
    const otherDetail = renderOtherDetail(q);
    if (otherDetail) wrap.appendChild(otherDetail);
  }
  if (q.sub) {
    q.sub.forEach(sq => wrap.appendChild(renderQuestion(sq, true)));
  }
  return wrap;
}

function renderSection(sec, container) {
  const secAttrs = { class: "cond-section" };
  if (sec.showIf) secAttrs["data-show-if"] = sec.showIf;
  const secWrap = el("div", secAttrs);

  if (sec.heading) {
    secWrap.appendChild(
      el("div", { class: "section-head" }, [
        el("h2", { text: sec.heading }),
        sec.sub ? el("p", { text: sec.sub }) : null,
      ])
    );
  }
  if (sec.note) {
    secWrap.appendChild(el("div", { class: "note", html: sec.note }));
  }
  sec.questions.forEach(q => secWrap.appendChild(renderQuestion(q, false)));
  container.appendChild(secWrap);
}

function wireConditionals(root) {
  // Any element with data-show-if="name:value1|value2" toggles based on the
  // named control's current value(s). Re-evaluated on every change.
  const conditional = [...root.querySelectorAll("[data-show-if]")];
  function evaluate() {
    conditional.forEach(f => {
      const [name, wanted] = f.dataset.showIf.split(":");
      const wantedVals = wanted.split("|");
      const checked = [...root.querySelectorAll(`[name="${name}"], [name="${name}[]"]`)]
        .filter(el => (el.type === "radio" || el.type === "checkbox") ? el.checked : el.value)
        .map(el => el.value);
      const show = wantedVals.some(w => checked.includes(w));
      f.classList.toggle("hidden", !show);
    });
  }
  root.addEventListener("change", evaluate);
  evaluate();
}

// Builds a plain-text summary from the visible, filled-in fields —
// grouping repeated keys (checkboxes) into one comma-joined line —
// and skipping anything hidden by conditional logic.
function exportText(formEl, title) {
  const seen = new Map(); // key -> array of values, in field order
  const order = [];
  const fields = [...formEl.querySelectorAll("input, textarea, select")];

  fields.forEach(f => {
    const fieldWrap = f.closest(".field");
    if (fieldWrap && fieldWrap.closest(".hidden")) return;
    if (!f.name) return;

    let key = f.name.endsWith("[]") ? f.name.slice(0, -2) : f.name;
    let value;
    if (f.type === "radio" || f.type === "checkbox") {
      if (!f.checked) return;
      value = f.value;
    } else if (f.type === "file") {
      value = f.files.length ? [...f.files].map(x => x.name).join(", ") : "";
    } else {
      value = f.value.trim();
    }
    if (value === "" || value === undefined) return;

    if (!seen.has(key)) {
      seen.set(key, []);
      order.push(key);
    }
    seen.get(key).push(value);
  });

  const lines = [title, "Exported " + new Date().toLocaleString(), ""];
  order.forEach(key => {
    lines.push(key + ":");
    lines.push(seen.get(key).join(", "));
    lines.push("");
  });
  return lines.join("\n");
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "response";
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function buildForm({ formEl, data, title, filenamePrefix, formspreeEndpoint }) {
  data.sections.forEach(sec => renderSection(sec, formEl));
  wireConditionals(formEl);

  let lastExport = "";
  let lastFilename = "response.txt";

  formEl.addEventListener("submit", async e => {
    e.preventDefault();
    if (!formEl.reportValidity()) return;

    const submitBtn = formEl.querySelector('button[type="submit"]');
    const statusEl = formEl.querySelector(".status");

    const nameField = formEl.querySelector('[name="Name"], [name="Business name"], [name="Who\'s filling this out"]');
    const who = nameField && nameField.value ? slug(nameField.value) : "response";
    lastExport = exportText(formEl, title || document.title);
    lastFilename = `${filenamePrefix || "form"}-${who}-${new Date().toISOString().slice(0, 10)}.txt`;

    downloadText(lastExport, lastFilename);

    let emailFailed = false;
    if (formspreeEndpoint) {
      if (submitBtn) submitBtn.disabled = true;
      if (statusEl) statusEl.textContent = "Sending…";
      try {
        const res = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(formEl),
        });
        emailFailed = !res.ok;
      } catch {
        emailFailed = true;
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (statusEl) statusEl.textContent = "";
      }
    }

    formEl.style.display = "none";
    document.getElementById("success").style.display = "block";
    const emailStatusEl = document.getElementById("email-status");
    if (emailStatusEl) emailStatusEl.textContent = emailFailed
      ? "Heads up: the automatic email didn't go through, so please attach and send the downloaded file as a backup."
      : "";
    window.scrollTo({ top: 0, behavior: "smooth" });

    const again = document.getElementById("download-again");
    if (again) {
      again.onclick = () => downloadText(lastExport, lastFilename);
    }
  });
}
