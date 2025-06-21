#!/bin/sh

cat <<EOF

============================================================
 TelcoAdmin Portal CTF Environment
------------------------------------------------------------
 This project is intentionally vulnerable and must ONLY be
 run in Docker. Do NOT run on your host or deploy publicly.

 To access the app: http://localhost:5173

 See README.md for full CTF instructions and rules.
============================================================

EOF

exec serve -s dist -l 5173
