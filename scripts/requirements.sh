#!/bin/bash
source ~/.nvm/nvm.sh

if ! git lfs --version &>/dev/null; then
  echo "Git LFS is required, but is not installed. Aborting."
  exit 1
fi

if ! command -v nvm &>/dev/null; then
  echo "NVM is required, but is not installed. Aborting."
  exit 1
fi
