const paths = require('../../../paths');
const { componentPath, setTemplatePath } = require('../../plop-utils');

/**
 * @typedef {import('plop').AddActionConfig} AddActionConfig
 */

module.exports = function plopActions({ componentType, componentRole, componentName }) {
  const setPath = componentPath(componentRole);

  /** @type {Array<AddActionConfig>} */
  let actions = [];

  if (componentType === 'component') {
    actions = [
      ...actions,
      {
        type: 'add',
        path: setPath('tsx'),
        templateFile: setTemplatePath('tsx'),
      },
      {
        type: 'add',
        path: setPath('less'),
        templateFile: setTemplatePath('less'),
      },
      {
        type: 'add',
        path: setPath('test.tsx'),
        templateFile: setTemplatePath('test.tsx'),
      },
    ];
  }

  if (componentType === 'module') {
    actions = [
      ...actions,
      {
        type: 'addMany',
        base: `${paths.pathPlopTemplates}/module`,
        destination: `${paths.src}/modules/{{properCase componentName}}`,
        templateFiles: `${paths.pathPlopTemplates}/module/**`,
        stripExtensions: ['plop'],
        data: {
          componentName,
        },
      },
    ];
  }

  return actions;
};
