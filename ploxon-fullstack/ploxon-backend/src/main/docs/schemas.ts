import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  projectsSchema,
  projectSchema,
  signUpParamsSchema,
  addProjectParamsSchema,
  saveProjectParamsSchema,
  projectStatsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addProjectParams: addProjectParamsSchema,
  error: errorSchema,
  projects: projectsSchema,
  project: projectSchema,
  saveProjectParams: saveProjectParamsSchema,
  projectStats: projectStatsSchema
}
