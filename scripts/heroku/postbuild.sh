
cd ui/

echo "Build and Export UI"
yarn export

cd ../api

echo "Copy Exported UI to API"
cp -r ui/out public

yarn install

echo "Build API"
yarn build

echo "FINISHED postbuild"
