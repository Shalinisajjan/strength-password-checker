# Keystone — Project report

## Problem statement and objectives

Password advice is easy to misunderstand: character variety alone does not make a short or predictable password strong, and a browser meter cannot guarantee that a password is safe. This project demonstrates a privacy-preserving educational checker that estimates relative strength, explains signals, and encourages long, unique passphrases. It has no login, collection, or cracking feature.

## System design and technology

The application is a static HTML/CSS/JavaScript page. `evaluator.js` exports a pure `evaluate(password)` function; `app.js` connects it to the UI. There is no server endpoint or persistence mechanism. This separation makes the scoring function independently testable. The page includes semantic labels, keyboard-operable buttons, visible focus styles, a live results region, a meter value, responsive layout, and a clear action. A small illustrative common-password set is embedded in the evaluator; it is not comprehensive.

## Evaluation method

The evaluator starts at zero and assigns a length score: under 8 characters gets 0; 8–11 gets 1; 12–15 gets 2; 16–19 gets 3; 20 or more gets 4. Using at least three character classes (lowercase, uppercase, digits, symbols) adds only one point. Repeated runs or a character set of at most two characters subtract two. Familiar sequential/keyboard patterns subtract two. Entries matching a small common-password set or its normalized substitution form subtract four. Some familiar terms reduce the score by one. The final score is clamped to 0–4 and mapped to Very Weak, Weak, Fair, Strong, or Very Strong. Feedback names applicable factors and recommends uniqueness.

Predictable substitutions are normalized for common substitutions such as `@`/`4` to `a`, `0` to `o`, `1`/`!` to `i`, `3` to `e`, `5`/`$` to `s`, and `7` to `t`. This is a coarse rule, not a general substitution solver.

## Limitations

This is a teaching heuristic, not a calibrated entropy estimate, professional password-auditing system, or account-specific risk assessment. The common list and pattern rules are intentionally small; obscure patterns and leaked passwords may not be detected. Scoring thresholds are illustrative, character classes are only a modest signal, and the tool does not model attacker knowledge, rate limits, hashing algorithms, hardware, or breach data. It makes no claim about exact cracking time. A high rating is not a guarantee: use a unique credential for every account and prefer a password manager or long random passphrase.

## Privacy and security decisions

Input is evaluated in memory in the current page. The app does not call network APIs, write cookies/local storage, or log the value. It uses no backend and asks for no account credentials. Feedback is inserted as text nodes. The value remains in the field until cleared or the page is closed; the clear button empties it. Optional Google Fonts are linked for presentation only; to make the whole page strictly network-silent, remove the `@import` at the top of `styles.css`. The page works with system fonts offline.

## Results and tests

Basic tests cover short input, a long fictional passphrase, repeated characters, a common password, predictable substitution, sequential patterns, and empty input. Run `node tests.js`. Tests assert deterministic score outcomes and explanatory factors. No real user passwords belong in test data or screenshots.

## Future improvements

Use a vetted local breach-password dataset with carefully documented privacy and licensing; strengthen multilingual and Unicode-aware pattern analysis; calibrate against a recognized password-strength estimator; add broader property-based tests; and offer a strict offline deployment option that removes the optional font import. Keep any added data and processing local unless a separate, explicit privacy review supports otherwise.
