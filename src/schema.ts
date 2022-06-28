import { Type, Static } from '@sinclair/typebox';

const CommonSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  lastLogin: Type.String({ format: 'date-time' }),
  type: Type.Union([Type.Literal('Agent'), Type.Literal('Client')]),
});

const AgentSchema = Type.Intersect([
  CommonSchema,
  Type.Object({
    licenseNumber: Type.Number(),
  }),
]);

const ClientSchema = Type.Intersect([
  CommonSchema,
  Type.Object({
    street: Type.String(),
    city: Type.String(),
    state: Type.String(),
    zip: Type.String(),
  }),
]);

const UserSchema = Type.Union([AgentSchema, ClientSchema]);

export const UserListSchema = Type.Array(UserSchema);

export type UserList = Static<typeof UserListSchema>;
