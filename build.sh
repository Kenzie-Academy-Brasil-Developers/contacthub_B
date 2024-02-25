// build.sh
#!/usr/bin/env bash
# exit on error
cd src
tsc
set -o errexit
psql -U astol -d contacHubDB -c "DELETE FROM contacts;"
psql -U astol -d contacHubDB -c "DELETE FROM users;"
yarn
yarn build
yarn typeorm migration:run -d dist/data-source