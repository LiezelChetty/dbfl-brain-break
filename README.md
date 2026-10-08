# DBFL Brain Break

Three browser games for staff wellness: Match & Unwind, Find Your Path and Memory Moment.

Open `index.html` locally or deploy this repository on Vercel with Framework Preset **Other** and no build command. The app is self-contained, including the DBFL logo, slogan, icons and game logic. No external fonts, APIs, analytics or sign-in.

SharePoint card links on the approved deployed domain:

- `/#match`
- `/#path`
- `/#memory`

An external live link still needs to be allowed by IT; embedding does not bypass network restrictions.

Run `node verify.cjs` for core rule checks. Run `python3 build.py` after editing source files to regenerate `index.html`.

Best scores are stored only in the current browser. See `README.txt` for play, accessibility and internal-hosting instructions.
