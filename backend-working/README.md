# backend-working

This folder is a Vercel-ready extraction of the project's Express backend, restructured as serverless functions under `/api`.

Environment variables (set in Vercel dashboard or your environment):
- `MONGO_URI` (or `MONGODB_URI`): MongoDB connection string
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLOUDINARY_NAME`
- `CLOUDINARY_KEY`
- `CLOUDINARY_SECRET`

Deploy:

1. From project root run:

```bash
vercel --cwd backend-working --prod
```

2. Add the environment variables listed above in the Vercel project settings before testing endpoints.

Notes:
- This uses a serverless-friendly cached MongoDB connector in `config/mongodb.js`.
- All API endpoints are under `/api/*` (each endpoint is a separate Vercel function).
