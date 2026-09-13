# Client Intake Forms

Two static forms, no backend:

- **`index.html`** — Project Inquiry. Short, public. Link this from your site.
- **`strategy-brief.html`** — Strategy Brief. The deep adaptive questionnaire. Don't link it anywhere public — send the URL directly to a client once they've signed.

On submit, each form validates required fields, then generates a plain-text
summary of the answers and downloads it straight to the visitor's device as a
`.txt` file (e.g. `project-inquiry-jane-doe-2026-09-13.txt`). Nothing is sent
over the network — the client attaches that file to an email back to you, or
you follow up once they send it. If you'd rather have submissions emailed to
you automatically, see **Going further** below.

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

## Going further

The text-download approach needs zero setup and zero third-party accounts,
but it does depend on the client actually emailing you the file. If you'd
rather have submissions land in your inbox automatically, the smallest add-on
is a free form backend like **Formspree** or **Web3Forms**: you sign up,
get an endpoint URL, and swap the download call in `form-engine.js`'s
`buildForm()` for a `fetch()` POST to that endpoint — happy to wire that up
whenever you want it.
