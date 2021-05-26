#!/bin/sh

if [ $# -eq 0 ]
then
	echo Nope
	exit 1
fi

TMPOUTD_BASE=/run/user/${UID}/pretext
TMPOUTD=${TMPOUTD_BASE}/testing/fork/${1}/html

mkdir -p ${TMPOUTD}/knowl
if ! test -L build
then
	ln -s ${TMPOUTD_BASE} build
fi

cp expand.css ${TMPOUTD}/developer.css
cp expand.js ${TMPOUTD}/expand.js

${HOME}/local/src/git/forks/pretext/mathbook/pretext/pretext \
  --verbose \
  --component all \
  --format html \
  --publisher ${1}-pub.xml \
  --directory ${TMPOUTD} \
  ${1}.xml

sed -i \
  -e 's/<link.*toc_default\.css.*>/<!-- & -->/' \
  -e 's/<link.*colors_default\.css.*>/<!-- & -->/' \
  -e 's/<link.*setcolors\.css.*>/<!-- & -->/' \
  -e 's/<\/head>/<script src="expand.js"><\/script>\n&/' \
  ${TMPOUTD}/*.html
