export const saveProjectParamsSchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string'
    }
  },
  required: ['description']
}
