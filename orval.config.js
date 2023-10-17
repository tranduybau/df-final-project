module.exports = {
    'final-project-file': {
      input: 'https://openrouter-api.dwarvesf.com/api/v1/openapi.json',
      output: {
        mode: 'tags-split',
        workspace: './services',
        target: './app.ts',
        schemas: './model',   
        client: 'swr',
        mock: true,
        override: {
            mutator: {
                path: './mutator/requester.ts',
                name: 'requester',
            },
        },
      },
    },
  }