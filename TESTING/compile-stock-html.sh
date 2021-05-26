#!/bin/sh

if [ $# -eq 0 ]
then
	echo Nope
	exit 1
fi

TMPOUTD_BASE=/run/user/${UID}/pretext
TMPOUTD=${TMPOUTD_BASE}/testing/stock/${1}/html

mkdir -p ${TMPOUTD}/knowl
if ! test -L build
then
	ln -s ${TMPOUTD_BASE} build
fi

/opt/pretext/pretext/pretext \
  --verbose \
  --component all \
  --format html \
  --publisher ${1}-pub.xml \
  --directory ${TMPOUTD} \
  ${1}.xml
