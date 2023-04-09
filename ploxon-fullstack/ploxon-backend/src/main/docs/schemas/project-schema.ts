export const projectSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    },
    projectId: {
      type: 'string'
    },
    projectPublicKey: {
      type: 'string'
    },
    projectName: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    resources: {
      type: 'string'
    },
    projectPrivateStatus: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    stats: {
      type: 'object'
    }
  }
}
