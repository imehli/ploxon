import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: '4Dev - Polls for Programmers',
    description: 'This is the API documentation made by instructor Coyote White in the Udemy course on NodeJs using Typescript, TDD, Clean Architecture and following the principles of SOLID and Design Patterns.',
    version: '1.0.0',
    contact: {
      name: 'Coyote White',
      email: 'coyote.white@gmail.com',
      url: 'https://www.linkedin.com/in/rwhite'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  externalDocs: {
    description: 'Link to full training',
    url: 'https://www.udemy.com/course/tdd-com-mango/?referralCode=B53CE5CA2B9AFA5A6FA1'
  },
  servers: [{
    url: '/api',
    description: 'Main Server'
  }],
  tags: [{
    name: 'Login',
    description: 'Login-related APIs'
  }, {
    name: 'Project',
    description: 'Poll related APIs'
  }],
  paths,
  schemas,
  components
}
