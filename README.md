# REQUIERE
```bash
git clone git@github.com:3forges/pesto-api.git
```


# INSTALL
```bash
git clone git@github.com:BorisTherin/mytuto-redux-typescript.git
pnpm dlx degit reduxjs/redux-templates/packages/vite-template-redux ./mytuto-redux-typescript/ --force
cd mytuto-redux-typescript
```

# START
```bash
cd ../pesto-api/
source .env.sh
docker compose up 1> /dev/null 2> /dev/null &
cd nest-pnpm-docker/
npm start
docker compose down
``` 