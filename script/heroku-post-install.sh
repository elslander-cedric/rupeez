npm run ng:build
npm run node:build
cat <<EOT >> settings.json
{
    "port": 9876,
    "googleMapsAPIKey": "AIzaSyATJnu9FYOi3-s2QZqmKne3LS_ECbUzc-M"
}
EOT