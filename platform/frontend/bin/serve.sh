#!/bin/sh

script_path=$(python -c 'import sys; import os.path; print(os.path.realpath(sys.argv[1]))' "$0")
script_dir=$(dirname "$script_path")
cd "$script_dir/.."

rm -rf "build"

npm start
