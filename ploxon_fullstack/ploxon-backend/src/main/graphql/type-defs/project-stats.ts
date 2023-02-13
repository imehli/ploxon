import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    projectStats (projectId: String!): ProjectStats! @auth
  }

  extend type Mutation {
    saveProjectStats (projectId: String!, description: String!): ProjectStats! @auth
  }

  type ProjectStats {
    id: ID!
    accountId: String!
    projectId: String!
    projectPublicKey: String!
    projectName: String!
    description: String!
    resources: String!
    projectPrivateStatus: String!
    createdAt: DateTime!
    stats: ProjectStatsModel!
  }

  type ProjectStatsModel {
    status: String!
    balance: Int
    rate: Int
    date: DateTime!
  }
`
