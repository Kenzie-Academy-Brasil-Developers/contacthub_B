// build.sh
#!/usr/bin/env bash
# exit on error
cd src
tsc
set -o errexit
yarn
yarn build
yarn typeorm migration:run -d dist/data-source