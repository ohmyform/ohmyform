
cd ui/

echo "Install UI"
yarn install --frozen-lockfile

echo "Build and Export UI"
yarn export

cd ../api

echo "Install API"
yarn install --frozen-lockfile

echo "Copy Exported UI to API"
cp -r ui/out public

yarn install

echo "Build API"
yarn build


echo "FINISHED build for UI and API"
