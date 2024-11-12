export const USER_RESPONSE_SAMPLE = Object.freeze({
  GET_ALL_USERS: {
    status: 200,
    description: 'List of users fetched successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
          },
          login: { type: 'string', example: 'user2' },
        },
      },
    },
  },
  GET_ONE_USER: {
    status: 200,
    description: 'User exists',
  },
  CREATE_USER: {
    status: 201,
    description: 'User created',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User 486bd5b8-be2a-4d72-890b-5bf97a9b1bf3 created',
        },
      },
    },
  },
  UPDATE_USER_PASSWORD: {
    status: 200,
    description: 'User updated',
  },
  DELETE_USER: {
    status: 204,
    description: 'User deleted',
  },
});

export const USER_PARAMS_SAMPLE = Object.freeze({
  GET_ONE_USER: {
    name: 'id',
    description: 'Get user with specific id',
    example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
  },
  UPDATE_USER_PASSWORD: {
    name: 'id',
    description: 'Update users password',
    example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
  },
  DELETE_USER: {
    name: 'id',
    description: 'Delete user',
    example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
  },
});
