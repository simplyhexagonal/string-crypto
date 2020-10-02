
npm login
npm publish
npm pack
git tag -a v$(jq -r .version package.json) -m "Releasing version v$(jq -r .version package.json)"
git push origin --tags
npm adduser --registry=https://npm.pkg.github.com/
read -n 1 -s -r -p "Add @ to package.json and press any key to continue"
npm publish --registry=https://npm.pkg.github.com/
