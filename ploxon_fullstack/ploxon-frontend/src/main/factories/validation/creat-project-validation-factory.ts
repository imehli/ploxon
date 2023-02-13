import { ValidationComposite } from '@/main/composites'
import { ValidationBuilder as Builder } from '@/main/builders'

export const makeCreatProjectValidation = (): ValidationComposite => ValidationComposite.build([
  ...Builder.field('projectName').required().min(5).build(),
  ...Builder.field('description').required().min(5).build(),
  ...Builder.field('resources').required().min(5).build(),
  ...Builder.field('projectPrivateStatus').required().min(2).build()
])
