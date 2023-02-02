const paths = require('../../../paths');
const { routePath, setRoutePath } = require('../../plop-utils');

/**
 * @typedef {import('plop').AddActionConfig} AddActionConfig
 */

module.exports = function routeActions({ routeName }) {
  const setPath = routePath();

  /** @type {Array<AddActionConfig>} */
  const actions = [
    // {
    //   type: 'add',
    //   path: setPath('tsx'),
    //   templateFile: setRoutePath(),
    // },

    {
      type: 'addMany',
      base: `${paths.pathPlopTemplates}/route`,
      destination: `${paths.src}/routes/{{properCase routeName}}`,
      templateFiles: `${paths.pathPlopTemplates}/route/**`,
      stripExtensions: ['plop'],
      data: {
        routeName,
      },
    },
  ];

  return actions;
};
