#!/bin/sh

if [ $# -eq 0 ]
then
	echo Nope
	exit 1
fi

TMPOUTD=/run/user/${UID}/pretext/${1}/html

mkdir -p ${TMPOUTD}/knowl
mkdir -p build
if ! test -L build/html
then
	ln -s ${TMPOUTD} build/html
fi

cp expand.css build/html/developer.css

${HOME}/local/src/git/forks/pretext/mathbook/pretext/pretext \
  --verbose \
  --component all \
  --format html \
  --publisher ${1}-pub.xml \
  --directory build/html \
  ${1}.xml

