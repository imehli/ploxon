import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    projects: [Project!]! @auth
  }

  type Project {
    id: ID!
    projectId: String!
    projectPublicKey: String!
    projectName: String!
    description: String!
    resources: String!
    projectPrivateStatus: String!
    createdAt: DateTime!
  }
`
