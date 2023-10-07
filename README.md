# INSTALL
```bash
git clone git@github.com:3forges/pesto-api.git
git clone git@github.com:BorisTherin/mytuto-redux-typescript.git
```


# CREATE
```bash
pnpm dlx degit reduxjs/redux-templates/packages/vite-template-redux ./mytuto-redux-typescript/ --force
```

# START
```bash
cd ../pesto-api/
source .env.sh
docker compose up 1> /dev/null 2> /dev/null &
cd nest-pnpm-docker/
npm start
docker compose down
cd ../../mytuto-redux-typescript
npm start
``` 