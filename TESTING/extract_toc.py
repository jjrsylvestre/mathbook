#!/usr/bin/python

from bs4 import BeautifulSoup
import sys

with open(sys.argv[1]) as fp:
	soup = BeautifulSoup(fp, 'html.parser')

toc = soup.find_all('nav', id='toc')
if (len(toc) > 0):
	print(toc[0])
else:
	print("couldn't find toc")
