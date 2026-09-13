# Client Intake Forms

Two static forms:

- **`index.html`** — Project Inquiry. Short, public. Link this from your site.
- **`strategy-brief.html`** — Strategy Brief. The deep adaptive questionnaire. Don't link it anywhere public — send the URL directly to a client once they've signed.

On submit, each form validates required fields, generates a plain-text
summary of the answers, and downloads it straight to the visitor's device as a
`.txt` file (e.g. `project-inquiry-jane-doe-2026-09-13.txt`) as a backup copy.
The answers are also POSTed to a **Formspree** endpoint (configured via
`formspreeEndpoint` in each HTML file's `buildForm()` call), which emails them
to you directly — no third-party account needed on the client's end, and no
custom backend to run. If that request fails for any reason (offline,
Formspree down), the success screen tells the visitor to send the downloaded
file as a fallback.

## Files

```
index.html            Project Inquiry page
strategy-brief.html   Strategy Brief page
style.css             Shared look (dark, Tally-style)
form-engine.js         Renders questions from data + handles the download
inquiry-data.js        The Project Inquiry question set
brief-data.js          The Strategy Brief question set, with conditional sections
```

## Editing the questions

Everything is in `inquiry-data.js` and `brief-data.js` — no HTML editing
needed for day-to-day changes. Each question is one object:

```js
{ id: "s1_name", name: "Your name", type: "text", label: "Your name", required: true }
```

- `type`: `text | email | tel | url | date | number | textarea | radio | checkbox | scale | file | select`
- `options`: array of strings, for `radio` / `checkbox` / `select`
- `help`: optional helper text under the label
- `sub`: an array of follow-up questions nested under this one
- `showIf`: `"Field Name:Value"` (or `"Field Name:Value A|Value B"`) — only
  shows this question (or section) when the named field has that value.
  Whole **sections** can also carry a `showIf` — see `brief-data.js`, where
  "Brand direction" only appears if "Brand identity" is checked in the scope
  question.

## Hosting on GitHub Pages

1. Create a new repository on GitHub (e.g. `client-intake`).
2. Push these files to it:
   ```
   git init
   git add .
   git commit -m "Client intake forms"
   git branch -M main
   git remote add origin https://github.com/<you>/client-intake.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set **Source** to the `main`
   branch, root folder, and save.
4. GitHub gives you a URL like `https://<you>.github.io/client-intake/`.
   - Public inquiry form: that URL (serves `index.html`)
   - Strategy brief: `https://<you>.github.io/client-intake/strategy-brief.html`
5. Optional: point a custom domain (e.g. `intake.yourdomain.com`) at it via
   the same Pages settings and a `CNAME` file — GitHub's docs walk through
   the DNS record.

## Changing the Formspree destination

Both forms currently point at the same Formspree endpoint. To change where
submissions get emailed, or to use separate endpoints per form:

1. Sign in at [formspree.io](https://formspree.io), create a form (or open an
   existing one), and copy its endpoint — `https://formspree.io/f/xxxxxxxx`.
2. Paste it into the `formspreeEndpoint` value in `index.html` and/or
   `strategy-brief.html`.
3. Formspree's free tier caps at 50 submissions/month; upgrade there if you
   need more.
