#!/usr/bin/env bash

script_path=$(python -c 'import sys; import os.path; print(os.path.realpath(sys.argv[1]))' "$0")
script_dir=$(dirname "$script_path")
cd "$script_dir/.."

npm install
npm install -g gulp flow-bin flow-typed eslint babel-eslint eslint-plugin-flowtype eslint-plugin-react
npm install --save ../../common/javascript/capitalrx-authnz
flow-typed install jest
