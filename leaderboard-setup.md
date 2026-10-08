# Staff-only leaderboard setup

The game site is public. Staff identities and rankings must remain in Microsoft 365, restricted to DBFL staff. Completed eligible games now open the supplied Form with game, result, level and hints pre-filled. Staff still review and submit the Form. The SharePoint list and Power Automate flow are not connected or created by this code change.

## 1. Microsoft Form

Title: DBFL Brain Break — Staff Leaderboard

Settings:
- Only people in my organisation can respond.
- Record name enabled.
- One response per person disabled, so staff can improve their scores.

Questions (required):
1. Game — choice: Match & Unwind / Find Your Path / Memory Moment
2. Result — text, restricted to a positive number. Enter matching points, path seconds or memory turns.
3. Level — choice: 60-second challenge / 5×5 / 6×6 / 7×7 / 8 pairs
4. Hints used — choice: No / Yes

Intro: Submit a completed game result. Matching entries must use the 60-second mode. Path entries must be completed without hints. Compare path results only within the same grid size.

Create a pre-filled link using sample values for ALL four questions and send it back so the game can fill these fields. Prefilled values are editable; Forms submissions are self-reported scores, not server-verified game results.

## 2. SharePoint list

Create a list on the staff wellness site called Brain Break Leaderboard.
Restrict access to the DBFL staff group. Do not grant anonymous or external access.

Columns:
- Title: single line of text, the player display name.
- PlayerEmail: single line of text, responder email from Forms (hide from displayed views).
- EntryKey: single line of text, unique values enforced: lowercase email | game | level.
- Game: choice, the three game names.
- Level: choice, the five levels above.
- Result: number, zero decimal places.
- AchievedAt: date and time.

Staff may read rankings; only list owners and the automation account should edit them.

Views:
- Match & Unwind: Game equals Match & Unwind, Level equals 60-second challenge, sort Result descending.
- Path 5×5: Game equals Find Your Path, Level equals 5×5, sort Result ascending.
- Path 6×6: same filter for 6×6, sort Result ascending.
- Path 7×7: same filter for 7×7, sort Result ascending.
- Memory Moment: Game equals Memory Moment, Level equals 8 pairs, sort Result ascending.
Show Title as Player, Result and AchievedAt. Use AchievedAt ascending as a tie-break sort. Keep email and EntryKey out of displayed views.

## 3. Power Automate flow

1. Microsoft Forms: When a new response is submitted.
2. Microsoft Forms: Get response details.
3. Validate the game/level pairing, a positive integer Result, and Hints used = No. Accept only the standard 60-second matching mode. Reject invalid combinations.
4. Use the recorded responder email, never a user-entered email question. Use Office 365 Users Get user profile (V2) to obtain the display name for Title.
5. Construct EntryKey from lowercase responder email, game and level separated by |.
6. SharePoint Get items: find the existing EntryKey. Escape any apostrophe in the key for the OData filter. Enable flow trigger concurrency control with degree 1 to avoid competing updates.
7. If absent: Create item with the new result and submission time.
8. If present: Update item ONLY when matching Result is higher, or path/memory Result is lower. Keep the original timestamp for tied results.

This keeps one personal best per staff member per game/level.

## 4. Display it

Add List web parts to the staff SharePoint page and select the views above.
The flow updates rankings after it processes each submission; a page refresh may be needed to see changes. This is automatically updated, not a guaranteed instant live feed.

Do not publish the list as a public CSV, anonymous JSON feed or an unprotected API on the Vercel site. To display private rankings inside the Vercel app itself would require Microsoft sign-in and a separate authorised backend.
