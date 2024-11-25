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
    schema: {
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
  CREATE_USER: {
    status: 201,
    description: 'User created',
    schema: {
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
  UPDATE_USER_PASSWORD: {
    status: 200,
    description: 'User updated',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
        },
        message: { type: 'string', example: 'Password updated successfully' },
        status: { type: 'string', example: 'success' },
      },
    },
  },
  DELETE_USER: {
    status: 204,
    description: 'User deleted',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User 486bd5b8-be2a-4d72-890b-5bf97a9b1bf3 deleted',
        },
      },
    },
  },
});

export const ARTIST_RESPONSE_SAMPLE = Object.freeze({
  GET_ALL: {
    status: 200,
    description: 'List of artists fetched successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
          },
          name: { type: 'string', example: 'User Name' },
          grammy: { type: 'boolean', example: true },
        },
      },
    },
  },
  GET_ONE: {
    status: 200,
    description: 'One artist by id',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
        },
        name: { type: 'string', example: 'User Name' },
        grammy: { type: 'boolean', example: true },
      },
    },
  },
  CREATE_ARTIST: {
    status: 201,
    description: 'Artist created',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
        },
        name: { type: 'string', example: 'User Name' },
        grammy: { type: 'boolean', example: true },
      },
    },
  },
  UPDATE_ARTIST: {
    status: 200,
    description: 'Artist updated',

    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '486bd5b8-be2a-4d72-890b-5bf97a9b1bf3',
        },
        name: { type: 'string', example: 'User Name' },
        grammy: { type: 'boolean', example: true },
        updatedAt: { type: 'string', example: '2024-11-16T12:00:55.534Z' },
      },
    },
  },
  DELETE_ARTIST: {
    status: 204,
    description: 'Artist deleted',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Artist 486bd5b8-be2a-4d72-890b-5bf97a9b1bf3 deleted',
        },
      },
    },
  },
});

export const ALBUM_RESPONSE_SAMPLE = Object.freeze({
  GET_ALL: {
    status: 200,
    description: 'List of albums fetched successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '790be637-060f-429d-af84-5fe6b3cd68c4',
          },
          name: { type: 'string', example: 'Stan' },
          year: { type: 'number', example: 2005 },
          artist: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '5c0e7ec7-6490-4216-8ba2-1c311113074d',
              },
              name: { type: 'string', example: 'Eminem' },
              grammy: { type: 'boolean', example: true },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-15T21:23:53.703Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-15T21:23:53.703Z',
              },
              deletedAt: {
                type: ['string', 'null'],
                format: 'date-time',
                example: null,
              },
            },
          },
        },
      },
    },
  },
  GET_ONE: {
    status: 200,
    description: 'One album by id',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '790be637-060f-429d-af84-5fe6b3cd68c4',
        },
        name: { type: 'string', example: 'Stan' },
        year: { type: 'number', example: 2005 },
        artist: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '5c0e7ec7-6490-4216-8ba2-1c311113074d',
            },
            name: { type: 'string', example: 'Eminem' },
            grammy: { type: 'boolean', example: true },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-15T21:23:53.703Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-15T21:23:53.703Z',
            },
            deletedAt: {
              type: ['string', 'null'],
              format: 'date-time',
              example: null,
            },
          },
        },
      },
    },
  },
  CREATE_ALBUM: {
    status: 201,
    description: 'Album created',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '790be637-060f-429d-af84-5fe6b3cd68c4',
        },
        name: { type: 'string', example: 'Stan' },
        year: { type: 'number', example: 2005 },
        artist: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '5c0e7ec7-6490-4216-8ba2-1c311113074d',
            },
            name: { type: 'string', example: 'Eminem' },
            grammy: { type: 'boolean', example: true },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-15T21:23:53.703Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-15T21:23:53.703Z',
            },
            deletedAt: {
              type: ['string', 'null'],
              format: 'date-time',
              example: null,
            },
          },
        },
      },
    },
  },
});

export const AUTH_RESPONSE_SAMPLE = Object.freeze({
  SIGN_IN: {
    status: 200,
    description: 'User auth',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZWI1ZWNjZS04Y2NmLTQ1NmUtOTUyYy04MjBhYjAxYzZjYTkiLCJsb2dpbiI6IlBldGVyIFBhcmsiLCJpYXQiOjE3MzI1NjM4MDYsImV4cCI6MTczMjU2NzQwNiwiYXVkIjoibG9jYWxob3N0OjQwMDAiLCJpc3MiOiJsb2NhbGhvc3Q6NDAwMCJ9.a4Watbn9Tx-O_18yXoqYYdBjf0bxP7bLX0BivLNjAhg ',
        },
      },
    },
  },
});

export enum CONTROLLER_TAGS {
  ALBUM = 'Albums',
  ARTIST = 'Artists',
  USERS = 'Users',
  FAVORITES = 'Favorites',
  AUTH = 'Auth',
}
