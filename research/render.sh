#!/bin/bash
# usage (from the repo root): bash research/render.sh <input.html|https://url> <output.png> [width=640] [height=5200]
# Renders a local HTML file or a URL to PNG with headless Chrome/Chromium (Windows or Linux).
IN="$1"; OUT="$2"; W="${3:-640}"; H="${4:-5200}"
for c in "$CHROME" "/c/Program Files/Google/Chrome/Application/chrome.exe" google-chrome google-chrome-stable chromium chromium-browser; do
  [ -n "$c" ] && command -v "$c" >/dev/null 2>&1 && { C="$c"; break; }
done
if [ -z "$C" ]; then echo "No Chrome/Chromium found. Install one (e.g. apt-get install -y chromium) or set CHROME=/path/to/chrome" >&2; exit 1; fi
if pwd -W >/dev/null 2>&1; then ROOT=$(pwd -W); P="file:///"; else ROOT=$(pwd); P="file://"; fi
case "$IN" in http*) SRC="$IN";; /*|?:*) SRC="$P$IN";; *) SRC="$P$ROOT/$IN";; esac
case "$OUT" in /*|?:*) OUTW="$OUT";; *) OUTW="$ROOT/$OUT";; esac
PROF=$(mktemp -d 2>/dev/null || echo "$ROOT/research/chrome-prof-$$")
timeout 90 "$C" --headless=new --no-sandbox --disable-gpu --hide-scrollbars --user-data-dir="$PROF" \
  --virtual-time-budget=8000 --window-size="$W,$H" --screenshot="$OUTW" "$SRC" >/dev/null 2>&1
rm -rf "$PROF"
ls -la "$OUT"
