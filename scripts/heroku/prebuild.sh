
echo "Fetch Submodules"
git clone --depth 1 https://github.com/ohmyform/ui ui
git clone --depth 1 https://github.com/ohmyform/api api

echo "Install UI"
yarn --cwd ui install --frozen-lockfile

echo "Install API"
yarn --cwd api install --frozen-lockfile

echo "FINISHED prebuild"
