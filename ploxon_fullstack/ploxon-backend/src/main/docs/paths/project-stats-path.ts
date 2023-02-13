export const projectStatsPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Project'],
    summary: 'API to create projectresponse',
    description: 'This route can only be performed by **authenticated users**',
    parameters: [{
      in: 'path',
      name: 'projectId',
      description: 'ID of the project to be resourcesed',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveProjectParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/projectStats'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Project'],
    summary: 'API to query the result of aproject',
    description: 'This route can only be performed by **authenticated users**',
    parameters: [{
      in: 'path',
      name: 'projectId',
      description: 'ID of the project to be resourcesed',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/projectStats'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
