# Configuring npm for use with GitHub Packages

When working on projects with npm dependencies that reside in GitHub Packages, 
npm has to be configured to be able to fetch some of the packages from a different registry.

The way this is done, is by scoping all the packages with `@elementor` scope, 
then configure npm to fetch all packages with this prefix from GitHub Packages.

There a to ways to configure npm; 
* Interactive - when done manually, and 
* Static - for docker images ect.

In any case, you first need to obtain a Personal access token (PAT) from GitHub with `repo` and `read:packages` scopes.

## Interactive

Set GitHub Packages as registry for packages with `@elementor` scope.
```bash
npm config set '@elementor:registry' 'https://npm.pkg.github.com/elementor'
```

Login npm to the GitHub Packages using PAT.
```bash
npm login --registry=https://npm.pkg.github.com
```

Fill the form:
```
Username: <github username>
Password: <personal access token>
Email: (this IS public) <email associated with github account>
```

Done!

## Static

Edit the `~/.npmrc` file to include the following (with yor PAT in place):
```
@elementor:registry=https://npm.pkg.github.com/elementor
//npm.pkg.github.com/:_authToken=<personal access token>
```
