
cd ui/

echo "Install UI"
yarn install --frozen-lockfile

cd ../api

echo "Install API"
yarn install --frozen-lockfile

echo "FINISHED prebuild"
