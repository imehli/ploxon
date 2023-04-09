export const addProjectParamsSchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string'
    },
    resourcess: {
      type: 'array',
      items: {
        $ref: '#/schemas/projectResources'
      }
    }
  },
  required: ['description', 'resourcess']
}
