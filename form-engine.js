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
  wrap.appendChild(el("label", { class: "q", for: id, text: `${opt}: feel free to type more (optional)` }));
  wrap.appendChild(el("input", { type: "text", name: `${q.name} (${opt.toLowerCase()}, specify)`, id, placeholder: "Optional" }));
  return wrap;
}

const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function radarPoint(cx, cy, r, angle) {
  return [cx + r * Math.sin(angle), cy - r * Math.cos(angle)];
}

// A small live-updating radar chart used as a visual preview next to a
// multi-row scale question, not as the input itself (the 1-5 rows are).
function buildRadarChart(axisLabels) {
  const size = 280;
  const cx = size / 2, cy = size / 2;
  const maxR = 78;
  const n = axisLabels.length;
  const svg = svgEl("svg", { viewBox: `0 0 ${size} ${size}`, class: "radar-chart" });

  for (let ring = 1; ring <= 5; ring++) {
    const r = (maxR * ring) / 5;
    const pts = axisLabels.map((_, i) => radarPoint(cx, cy, r, (2 * Math.PI * i) / n).join(","));
    svg.appendChild(svgEl("polygon", { points: pts.join(" "), class: "radar-ring" }));
  }

  axisLabels.forEach((label, i) => {
    const angle = (2 * Math.PI * i) / n;
    const [x, y] = radarPoint(cx, cy, maxR, angle);
    svg.appendChild(svgEl("line", { x1: cx, y1: cy, x2: x, y2: y, class: "radar-axis" }));
    const [lx, ly] = radarPoint(cx, cy, maxR + 18, angle);
    const anchor = lx < cx - 2 ? "end" : lx > cx + 2 ? "start" : "middle";
    const text = svgEl("text", { x: lx, y: ly, class: "radar-label", "text-anchor": anchor });
    text.textContent = label;
    svg.appendChild(text);
  });

  const shape = svgEl("polygon", { points: "", class: "radar-shape" });
  svg.appendChild(shape);
  const dots = axisLabels.map(() => {
    const dot = svgEl("circle", { r: 3, class: "radar-dot hidden" });
    svg.appendChild(dot);
    return dot;
  });

  function update(values) {
    const pts = values.map((v, i) => {
      const angle = (2 * Math.PI * i) / n;
      const r = v ? (maxR * v) / 5 : 0;
      const [x, y] = radarPoint(cx, cy, r, angle);
      dots[i].setAttribute("cx", x);
      dots[i].setAttribute("cy", y);
      dots[i].classList.toggle("hidden", !v);
      return `${x},${y}`;
    });
    shape.setAttribute("points", pts.join(" "));
  }

  return { svg, update };
}

function renderScale(q) {
  const isMulti = !!(q.rows && q.rows.length > 1);
  const wrap = el("div", { class: isMulti ? "scale-with-radar" : "" });
  const rowsWrap = el("div", { class: "scale-rows" });
  const rowNames = [];

  (q.rows ? q.rows : [null]).forEach((row, ri) => {
    const rowWrap = el("div", { class: "scale-row" });
    if (row) rowWrap.appendChild(el("div", { class: "ends", html: row }));
    const opts = el("div", { class: "scale-opts" });
    const name = `${q.name}${row ? `_${ri + 1}` : ""}`;
    for (let i = 1; i <= 5; i++) {
      const id = `${q.id}_${ri}_${i}`;
      const input = el("input", { type: "radio", name, id, value: i });
      opts.appendChild(el("label", { for: id }, [input, document.createTextNode(i)]));
    }
    rowWrap.appendChild(opts);
    rowsWrap.appendChild(rowWrap);
    if (row) rowNames.push(name);
  });
  wrap.appendChild(rowsWrap);

  if (isMulti) {
    const axisLabels = q.rows.map(r => r.replace(/&harr;/g, "/").replace(/\s+/g, " ").trim());
    const chart = buildRadarChart(axisLabels);
    wrap.appendChild(el("div", { class: "radar-chart-wrap" }, [chart.svg]));

    const redraw = () => {
      const values = rowNames.map(name => {
        const checked = rowsWrap.querySelector(`input[name="${name}"]:checked`);
        return checked ? Number(checked.value) : null;
      });
      chart.update(values);
    };
    rowsWrap.addEventListener("change", redraw);
    redraw();
  }

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
  container.insertBefore(secWrap, container.querySelector(".actions"));
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

function buildForm({ formEl, data, formspreeEndpoint }) {
  data.sections.forEach(sec => renderSection(sec, formEl));
  wireConditionals(formEl);

  formEl.addEventListener("submit", async e => {
    e.preventDefault();
    if (!formEl.reportValidity()) return;

    const submitBtn = formEl.querySelector('button[type="submit"]');
    const statusEl = formEl.querySelector(".status");

    submitBtn.disabled = true;
    statusEl.textContent = "Sending…";
    statusEl.classList.remove("err");

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(formEl),
      });
      if (!res.ok) throw new Error("Formspree request failed");

      formEl.style.display = "none";
      document.getElementById("success").style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      statusEl.textContent = "Something went wrong sending that. Please try again, or email me directly.";
      statusEl.classList.add("err");
    } finally {
      submitBtn.disabled = false;
    }
  });
}
