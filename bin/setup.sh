#!/usr/bin/env bash

script_path=$(python -c 'import sys; import os.path; print(os.path.realpath(sys.argv[1]))' "$0")
script_dir=$(dirname "$script_path")
cd "$script_dir/.."

./platform/frontend/bin/setup.sh
