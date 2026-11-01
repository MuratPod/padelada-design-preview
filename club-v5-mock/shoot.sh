#!/bin/bash
# usage: shoot.sh page width fold|full
cd "$(dirname "$0")"; pg=$1;w=$2;m=$3;h=$([ $w = 390 ] && echo 844 || echo 900);H=$h;[ $m = full ] && H=$([ $w = 390 ] && echo 6000 || echo 4600)
timeout 40 google-chrome --headless=new --no-sandbox --disable-gpu --hide-scrollbars --virtual-time-budget=2500 --window-size=$w,$H --screenshot=shots/$w-$pg-$m.png "file://$PWD/$pg.html?shot=$h" >/dev/null 2>&1
