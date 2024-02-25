// build.sh
#!/usr/bin/env bash
# exit on error
cd src
tsc
set -o errexit


psql -U astol -d contactHubDB -c "DO $$ DECLARE r RECORD; BEGIN FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE'; END LOOP; END $$;"

yarn
yarn build
yarn typeorm migration:run -d dist/data-source