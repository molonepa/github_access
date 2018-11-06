#!/bin/bash

echo "Installing prerequisites..."

pip install PyGithub
pip install IPython
pip install numpy
easy_install https://github.com/mikedewar/d3py/tarball/master
pip install pandas
pip install networkx

echo "Finished."
