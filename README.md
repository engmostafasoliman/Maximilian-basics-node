# create_server

A learning e-commerce app from Maximilian Schwarzmüller's Node.js course. Server-rendered
shop with an admin area for managing products, currently mid-migration from Sequelize/MySQL
to the MongoDB native driver (MongoDB Atlas).

## Features
- Server-side rendering with EJS templates and shared partials
- Express routing split into shop routes and admin routes (`/admin`)
- Product management (add / edit / delete) backed by MongoDB
- Per-user cart stored on the user document
- Static assets served from `public/`

## Stack
- Runtime: Node.js + Express 5
- Views: EJS
- Database: MongoDB (native `mongodb` driver, Atlas cluster)
- Dev tooling: nodemon
- Legacy (being phased out): Sequelize + mysql2

## Quick start

1. Install dependencies
   ```bash
   npm install
   ```

2. Configure the database
   - The MongoDB connection lives in `util/database.js`.
   - Secrets belong in `atlas-credentials.env`, which is gitignored — it is **not** committed.
   - Make sure your current IP is on the Atlas **Network Access** allowlist, or the TLS
     handshake will fail (`SSL alert number 80`).

3. Run
   ```bash
   npm start          # nodemon app.js (auto-restarts on changes)
   # or
   npm run start-server   # node app.js
   ```
   The server listens on **http://localhost:3001**.

## Project layout
```
app.js               # entry point: middleware, route mounting, DB connect + listen
routes/              # admin.js, shop.js route definitions
controllers/         # admin.js, shop.js, errors.js request handlers
models/              # products.js, user.js, order.js (MongoDB models)
util/database.js     # MongoClient connect + getDb helper
views/               # EJS templates (shop/, admin/, includes/)
public/              # static css / js / images
```

## How it fits together
`app.js` connects to MongoDB first, then starts the server. A middleware loads the current
user on every request and attaches it as `req.user` (a `User` instance carrying `_id` and
`cart`). Shop routes render the storefront; `/admin` routes handle product CRUD. Models wrap
MongoDB collection calls (`insertOne`, `updateOne`, `findOne`, `find().toArray()`) and use
`ObjectId` for lookups.

## Migration status
- ✅ Product model, admin CRUD, shop listing/detail — on MongoDB
- ✅ User lookup, `req.user`, add-to-cart — on MongoDB
- 🚧 Cart line-item shape, orders, and checkout — still partly Sequelize-based

## Notes
- MongoDB documents use `_id` (an `ObjectId`), not `id` — templates and forms reference
  `product._id`.
- This is course/practice code, not production-ready.
