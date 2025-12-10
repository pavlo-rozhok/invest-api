import { z } from 'zod';

import { NodeEnvsEnum } from './models/enums/node-envs.enum';
import { LogLevelsEnum } from './models/enums/log-levels.enum';

const getBooleanValidation = ({ defaultValue }: { defaultValue: boolean }) =>
  z
    .enum(['false', 'true'])
    .default(defaultValue ? 'true' : 'false')
    .transform((is) => (is === 'true' ? true : false));

const EnvSchema = z.object({
  NODE_ENV: z.enum(NodeEnvsEnum).default(NodeEnvsEnum.DEVELOPMENT),
  PORT: z.coerce.number().int().positive().max(65535).default(3000),
  LOG_LEVEL: z.enum(LogLevelsEnum).default(LogLevelsEnum.INFO),
  ENABLE_METRICS: getBooleanValidation({ defaultValue: true }),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required').default('test_database_url'),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('\n❌ Invalid environment variables:');
  for (const issue of parsed.error.issues) {
    console.error(`• ${issue.path.join('.')}: ${issue.message}`);
  }
  process.exit(1);
}

const parsedData = parsed.data;

export const config = {
  database: {
    url: parsedData.DATABASE_URL,
  },
  env: {
    nodeEnv: parsedData.NODE_ENV,
    isDevelopment: parsedData.NODE_ENV === NodeEnvsEnum.DEVELOPMENT,
    isProduction: parsedData.NODE_ENV === NodeEnvsEnum.PRODUCTION,
    isTest: parsedData.NODE_ENV === NodeEnvsEnum.TEST,
  },
  server: {
    port: parsedData.PORT,
  },
  logging: {
    logLevel: parsedData.LOG_LEVEL,
  },
  metrics: {
    isEnabled: parsedData.ENABLE_METRICS,
  },
};
