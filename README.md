
# Sharepoint ORM
  
[![npm version](http://img.shields.io/npm/v/@jorgejr568/sharepoint-orm.svg)](https://npmjs.org/package/knex)
[![npm downloads](https://img.shields.io/npm/dm/@jorgejr568/sharepoint-orm.svg)](https://npmjs.org/package/knex)
[![Dependencies Status](https://david-dm.org/@jorgejr568/sharepoint-orm.svg)](https://david-dm.org/jorgejr568/sharepoint-orm)
[![Dev dependencies Status](https://david-dm.org/jorgejr568/sharepoint-orm/dev-status.svg)](https://david-dm.org/jorgejr568/sharepoint-orm)

## Install 🚀

```shell script
# NPM
npm install --save @jorgejr568/sharepoint-orm

# Yarn
yarn add @jorgejr568/sharepoint-orm
```

## Config 🔨

Create an __plugins/sharepoint-orm.js__ file to place your configuration. We'll export two factories, creating our _Auth_ and _Builder_ services.

```js
import { AuthFactory, BuilderFactory} from '@jorgejr568/sharepoint-orm'

const config = {
  apiUrl: process.env.API_URL,
  spUrl: process.env.SHAREPOINT_URL,
  tokenApi: process.env.API_TOKEN,
  application: process.env.APP_NAME, //'[uppercase and only letters portal name]',
  environment: process.env.APP_ENVIRONMENT //'DEV or PRD'
}

export const spAuth = AuthFactory(config)
export const spBuilder = BuilderFactory(config)
```

## Authorization 🚪

```js
import { spAuth } from '@/plugins/sharepoint-orm'

// sync
spAuth
  .authorize()
  .then(token => {
    // Token is automatically stored on spAuth
    console.log({ token })
    spAuth.current().then(user => {
      // Get current sharepoint user
      console.log({ user })
    })
  })
  .catch(e => {
    // Authorization error
    console.error({ e })    
  })

// async
try{
  const token = await spAuth.authorize()
  console.log({ token })
  
  const user = await spAuth.current()
  console.log({ user })
}
catch(e){
  console.error({ e })    
}
```

### Refresh token 🔃

```js
import { spAuth } from '@/plugins/sharepoint-orm'

try{
  const token = await spAuth.authorize()
  console.log({ token })
  setInterval(async () => {
    const newToken = await spAuth.refreshToken()
    // Token is automatically updated on spAuth
    console.log({ newToken })
  }, 2 * 60 * 1000) // Each 2 minutes
}
catch(e){
    // Authorization error
    console.error({ e })    
}
```

## Querying 🎯

### Simple select
```js
import { spBuilder } from '@/plugins/sharepoint-orm'

const items = spBuilder.table('ListName').select('*').get()
console.log({ items })
```

#### Available select methods

- where
- orWhere
- whereNot
- orWhereNot
- whereRaw
- orWhereRaw

### Available leaf methods

- get
- insertGetId
- update -> Must pass a where condition with id column
- delete -> Must pass a where condition with id column
