export const projectPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Project'],
    summary: 'API to list allprojects',
    description: 'This route can only be performed by **authenticated users**',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/projects'
            }
          }
        }
      },
      204: {
        description: 'Success but no data to display'
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
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Project'],
    summary: 'API to create aproject',
    description: 'This route can only be run by **administrators**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addProjectParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Success but no data to display'
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
