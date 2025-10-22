import { z } from 'zod';

const configSchema = z.object({
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  port: z.coerce.number().default(3000),
  databaseUrl: z.string(),
  cors: z.object({
    origin: z.string().default('http://localhost:5173'),
  }),
  rateLimit: z.object({
    windowMs: z.coerce.number().default(15 * 60 * 1000), // 15 minutes
    max: z.coerce.number().default(100),
  }),
});

const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL || (() => {
    throw new Error('DATABASE_URL environment variable is required');
  })(),
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS,
    max: process.env.RATE_LIMIT_MAX_REQUESTS,
  },
};

export const config = configSchema.parse(env);