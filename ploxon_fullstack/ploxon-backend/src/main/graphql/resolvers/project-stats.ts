import { adaptResolver } from '@/main/adapters'
import { makeLoadProjectStatsController, makeSaveProjectStatsController } from '@/main/factories'

export default {
  Query: {
    projectStats: async (parent: any, args: any, context: any) => adaptResolver(makeLoadProjectStatsController(), args, context)
  },

  Mutation: {
    saveProjectStats: async (parent: any, args: any, context: any) => adaptResolver(makeSaveProjectStatsController(), args, context)
  }
}
