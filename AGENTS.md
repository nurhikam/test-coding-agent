# AGENTS.md

Guidance for agents working in this repository.

## What this is

BNI eKYC Admin Dashboard — the internal screen where a BNI reviewer works through
identity verification cases that automated scoring could not decide.

React 18 + Vite, React Router for navigation, Tailwind for styling, `lucide-react`
for icons. No test runner and no linter are configured; correctness is carried by
review, so changes need to be readable on their own.

## Layout

```
src/
  App.jsx                       routes only
  components/<Feature>/<Feature>.jsx
  services/<name>Service.js     one module per backend area
```

One folder per feature, named after the feature, holding a component of the same
name. A component that grows a second screen gets a second file in the same folder
rather than a new top-level folder.

Services are the only place that talks to a backend. A component never fetches; it
calls a service. Today every service returns mock data behind a `setTimeout` — keep
that shape, so swapping in a real call later touches one file.

## Conventions

Follow what the surrounding files already do rather than the list below when the two
disagree — the code is the source of truth, this is a summary of it.

- `.jsx` for components, `.js` for services.
- Components are `const Name = () => {}` with a default export at the bottom.
- Single quotes in JavaScript, double quotes in JSX attributes. Semicolons.
  Two-space indent.
- Tailwind classes inline. No CSS modules, no styled-components.
- Names are English; user-facing copy is Indonesian.

## Error handling

`console.error` alone is not error handling. A failed call must leave the user
looking at something that says what happened — an empty table that never explains
itself is a bug, not a gap.

Guard arithmetic over a collection that can be empty. `reduce` over an empty array
with no fallback produces `NaN`, and `NaN` renders as a number nobody can act on.

## Data from a real person

Cases carry NIK, names, and identity photographs. Never write any of it to a log, an
error message, or a URL. When a case needs to be identified in a log, use its `id`.

## Commits

Before committing, list the files that will be included and the message you intend to
use, then wait for the user. Never bundle unrelated changes into one commit — a
scratch file swept in alongside a feature makes the commit unreviewable.

Commit messages describe the change, not the file count.

## Pull requests

Work reaches `master` through a pull request, never a direct push. Open one with
`/pr-create`, review it with `/pr-review`.

Approving, requesting changes and closing are decisions for a human reviewer. An
agent comments; it does not decide.
