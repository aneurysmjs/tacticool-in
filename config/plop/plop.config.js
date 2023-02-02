const helpers = require('./helpers');

const componentGenerator = require('./generators/component/componentGenerator');
const moduleGenerator = require('./generators/module/routeGenerator');
const routeGenerator = require('./generators/route/routeGenerator');

/**
 * @typedef {import('plop').NodePlopAPI} NodePlopAPI
 */

/**
 *
 * @param {NodePlopAPI} plop
 */
module.exports = function plopFn(plop) {
  // Here we register each helper function for Plop.
  Object.keys(helpers).forEach((key) => {
    plop.setHelper(key, helpers[key]);
  });

  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('module', moduleGenerator);
  plop.setGenerator('route', routeGenerator);
};
