import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

dotenv.config();

const config = {
  overwrite: true,
  schema: process.env.SANITY_GRAPHQL_SCHEMA_URL,
  documents: 'src/graphql/**/*.graphql',
  generates: {
    './src/graphql/generates.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: {
          endpoint: process.env.SANITY_GRAPHQL_URL,
          fetchParams: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        },
        exposeQueryKeys: true,
        exposeFetcher: true,
        addInfiniteQuery: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write', 'eslint --fix'],
  },
  dedupeFragments: true,
} as CodegenConfig;

export default config;
