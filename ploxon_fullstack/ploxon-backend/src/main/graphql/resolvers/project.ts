import { adaptResolver } from '@/main/adapters'
import { makeLoadProjectsController } from '@/main/factories'

export default {
  Query: {
    projects: async (parent: any, args: any, context: any) => adaptResolver(makeLoadProjectsController(), args, context)
  }
}
