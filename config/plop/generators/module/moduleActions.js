const paths = require('../../../paths');

/**
 * @typedef {import('plop').AddActionConfig} AddActionConfig
 */

module.exports = function routeActions({ moduleName }) {
  /** @type {Array<AddActionConfig>} */
  const actions = [
    {
      type: 'addMany',
      base: `${paths.pathPlopTemplates}/module`,
      destination: `${paths.src}/module/{{properCase moduleName}}`,
      templateFiles: `${paths.pathPlopTemplates}/module/**`,
      stripExtensions: ['plop'],
      data: {
        moduleName,
      },
    },
  ];

  return actions;
};
