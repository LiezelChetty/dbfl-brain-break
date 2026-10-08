DBFL BRAIN BREAK — STAFF GAMES

HOW TO TRY IT
Extract this ZIP into a folder, then open index.html in Edge or Chrome.
The complete hub and all three games are inside that one HTML file.
Internet access is not required. Keep this as an internal draft.

THREE GAMES
Match & Unwind: swap adjacent engineering icons to match at least three.
Choose a 60-second challenge or untimed play. Tap two neighbours or swipe.
Matches clear, pieces fall and cascades earn extra points.

Find Your Path: connect numbered checkpoints in order and visit every square.
Three levels: 5 x 5, 6 x 6 and 7 x 7. Tap squares or drag. Retrace to undo.
Hints follow one known valid solution; if you diverge, the first hint trims
your path back to that solution before the next hint adds a square.

Memory Moment: reveal tiles in pairs and find all eight matches.
No countdown; the game records the number of turns.

KEYBOARD
Tab to a board tile. Arrow keys move focus between neighbouring tiles.
Enter or Space selects a tile. Controls also work with Tab and Enter.

INTERNAL HOSTING / SHAREPOINT
This is a working standalone web app, NOT an installable SharePoint package.
Do not paste its JavaScript into a SharePoint text or Embed web part.
IT can host index.html on an approved internal HTTPS web server, or adapt
the included source into a SharePoint Framework (SPFx) web part and deploy
it through the organisation's app catalogue. An approved internally hosted
URL may be embedded if both SharePoint policy and server framing permit it.
Uploading HTML to a document library alone does not guarantee it will run.

The SharePoint card links can point to these URLs AFTER IT approves a host:
  <internal-host>/index.html#match
  <internal-host>/index.html#path
  <internal-host>/index.html#memory

PRIVACY AND DEPENDENCIES
No external fonts, libraries, APIs, analytics or network requests.
No sign-in, Forms submissions, names, email addresses or shared leaderboard.
Best matching scores and memory turns are stored in browser localStorage,
when permitted. If storage is blocked the games still run; bests will reset.
Games and puzzle boards are generated locally. Bests belong to this browser,
not to a verified employee identity.

CARD IMAGES
The card-images folder contains three 900 x 600 PNGs (and editable SVGs)
for replacing the travel photographs on the SharePoint challenge cards.

VERIFICATION
Core automated checks passed: 500 matching boards, 300 complete path
puzzles, 100 memory decks, gravity and match detection, JavaScript syntax
and no external references. DOM interaction checks passed for starts,
scoring/cascades, timer expiry, completion, hints/undo and restarting.
Live browser visual/touch testing and SharePoint deployment remain pending.

SOURCE
index.html: self-contained distributable app.
template.html, style.css, app.js, engines.js, connect-engine.js: editable source.
build.py: regenerates index.html from the editable files and icons.json.
verify.cjs: core rules, puzzle, memory deck and syntax checks (node verify.cjs).
Keyboard/touch presentation should be checked on staff devices before launch.
