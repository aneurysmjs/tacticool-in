/** @module helpers */
const paths = require('../paths');

/**
 * @typedef {'functional' | 'class'} Role
 * @typedef {'ts' | 'tsx' | 'test.tsx' | 'less'} Ext format/extension of the file.
 * @typedef {'component' | 'module'} ComponentType Component's type.
 */

/**
 * @typedef {object} ComponentPaths
 * @property {string} path Path where component willbe.
 * @property {string} templatePath Path template's location.
 */

/**
 * @typedef {object} Answers
 * @property {ComponentType} componentType
 */

/**
 * @function componentPath
 * @param {Role} role Component's role.
 * @return {(ext: Ext) => string} Full component's path with format.
 */
const componentPath = (role) => (ext) =>
  `${paths.src}/${role}/{{properCase componentName}}/{{properCase componentName}}.${ext}`;

/**
 * @function routePath
 * @param {Role} role Routes's role.
 * @return {(ext: Ext) => string} Full component's path with format.
 */
const routePath = () => (ext) =>
  `${paths.src}/routes/{{properCase routeName}}/{{properCase routeName}}.${ext}`;

/**
 * @function setTemplatePath
 * @param {Ext} ext
 * @returns {string} Full template's path with format.
 */
const setTemplatePath = (ext) => `${paths.pathPlopTemplates}/component/component.${ext}.plop`;

/**
 * @function setRoutePath
 * @returns {string} Full route's path with format.
 */
const setRoutePath = () => `${paths.pathPlopTemplates}/route/route.tsx.plop`;

/**
 * @param {ComponentType} type
 * @return {(answers: Answers) => boolean} componentType
 */
const checkComponentType =
  (type) =>
  ({ componentType }) =>
    componentType === type;

module.exports = {
  checkComponentType,
  componentPath,
  setTemplatePath,
  routePath,
  setRoutePath,
};
