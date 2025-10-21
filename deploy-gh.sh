#!/usr/bin/env bash
set -e
d=$(date +'%Y/%m/%d %H:%M:%S')
git add .
git commit -m "update on $d" || git commit --allow-empty -m "update on $d"
git push -f origin gh-pages
