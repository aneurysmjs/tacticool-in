const { checkComponentType } = require('../../plop-utils');

module.exports = [
  {
    type: 'list',
    name: 'componentType',
    message: 'what do you want to create?',
    choices: ['component', 'module'],
  },
  {
    type: 'prompt',
    name: 'componentName',
    message: 'Component name:',
    when: checkComponentType('component'),
  },
  {
    type: 'prompt',
    name: 'componentName',
    message: 'Module name',
    when: checkComponentType('module'),
  },
  {
    type: 'list',
    name: 'componentRole',
    message: 'choose component role',
    choices: ['core', 'common'],
    default: 'common',
    when: checkComponentType('component'),
  },
];
