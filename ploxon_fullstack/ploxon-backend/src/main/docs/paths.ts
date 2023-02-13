import {
  loginPath,
  projectPath,
  signUpPath,
  projectStatsPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/projects': projectPath,
  '/projects/{projectId}/stats': projectStatsPath
}
