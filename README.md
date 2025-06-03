# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Switching branch

```
git checkout dev
```

## Installing NPM modules

```
npm install
```

## App structure

```
src/
├── albums/
├── artists/
├── favorites/
├── tracks/
├── users/
├── app.controller.ts
├── app.service.ts
├── app.module.ts
├── errorHandling.ts
├── main.ts
```

## Running application

```
npm start
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test:users
```

```
npm run test:tracks
```

```
npm run test:artists
```

```
npm run test:albums
```

```
npm run test:favs
```

### Auto-fix and format

```
npm run lint
```
