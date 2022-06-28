import fastify from 'fastify';
import { UserList, UserListSchema } from './schema';

export const build = () => {
  const app = fastify({
    logger: {
      level: 'error',
    },
  });

  app.setErrorHandler(function (err, _request, reply) {
    if ((err as any).serialization) {
      app.log.error({ message: err.message }, 'Serialization error');
    }

    reply.send(err);
  });

  app.get<{ Reply: UserList }>(
    '/',
    {
      schema: {
        response: {
          200: UserListSchema,
        },
      },
    },
    (_req, reply) => {
      reply.code(200).send([
        {
          id: '1',
          name: 'Bob',
          lastLogin: new Date().toISOString(),
          type: 'Agent',
          licenseNumber: 12345,
        },
        {
          id: '2',
          name: 'Sally',
          lastLogin: new Date().toISOString(),
          type: 'Client',
          street: '1234 Foo St',
          city: 'Charleston',
          state: 'SC',
          zip: '12345',
        },
      ]);
    },
  );

  return app;
};
