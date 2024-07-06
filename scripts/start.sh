#!/bin/bash
source ~/.nvm/nvm.sh

if ! ./scripts/requirements.sh; then
  exit 1
fi

git lfs install
git lfs fetch
git lfs checkout

nvm i
npm i
npm run dev
