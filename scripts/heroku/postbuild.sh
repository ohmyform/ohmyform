
echo "Build and Export UI"
yarn --cwd ui export

echo "Copy Exported UI to API"
cp -r ui/out/* api/public/

echo "Build API"
yarn --cwd api build

echo "FINISHED postbuild"
