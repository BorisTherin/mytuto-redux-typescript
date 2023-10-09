# INSTALL
```bash
git clone git@github.com:3forges/pesto-api.git
cd pest-api
git checkout feature/dockerized_first_model 
cd ..
git clone git@github.com:BorisTherin/mytuto-redux-typescript.git
cd mytuto-redux-typescript
git checkout boris/pair/fix/http/api/call
```


# CREATION CONTEXT
```bash
pnpm dlx degit reduxjs/redux-templates/packages/vite-template-redux ./mytuto-redux-typescript/
```

# START
```bash
cd ../pesto-api/
source .env.sh
pnpm run db:start
cd pesto-api/
pnpm start
cd ../../mytuto-redux-typescript
pnpm start
``` 

# UTILS
```bash
docker-compose logs -f
```