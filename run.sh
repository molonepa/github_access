#!/bin/bash

echo "Running github_access.py..."
python github_access.py
echo "Data has been written to 'data.json'"
echo "Running server.py..."
python server.py
