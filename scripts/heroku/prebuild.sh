
echo "Fetch Submodules"
git submodule update --init

echo "Install UI"
yarn --cwd ui install --frozen-lockfile

echo "Install API"
yarn --cwd api install --frozen-lockfile

echo "FINISHED prebuild"
