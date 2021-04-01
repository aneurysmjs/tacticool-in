const complement = require('ramda/src/complement');

const components = './src/components';
const providers = './src/providers';

const checkComponentType = (checker) => ({ componentType }) => checker(componentType);

const isFunctional = (componentType) => componentType === 'functional';
const isProvider = (componentType) => componentType === 'provider';

module.exports = function plopFn(plop) {
  plop.setGenerator('React Component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'prompt',
        name: 'componentName',
        message: 'Name of your component:',
      },
      {
        type: 'list',
        name: 'componentType',
        message: "Choose component's type",
        choices: ['functional', 'provider'],
      },
      {
        type: 'list',
        name: 'componentRole',
        message: "Choose component's role",
        choices: ['base', 'core', 'shared'],
        default: 'shared',
        when: checkComponentType(complement(isProvider)),
      },
    ],
    actions({ componentType, componentRole }) {
      const role = componentRole;

      const componentActions = [
        {
          type: 'add',
          path: `${components}/${role}/{{properCase componentName}}/index.tsx`,
          templateFile: './config/plop/component/index.tsx.plop',
        },
        {
          type: 'add',
          path: `${components}/${role}/{{properCase componentName}}/{{properCase componentName}}.tsx`,
          templateFile: `./config/plop/component/component.tsx.plop`,
        },
        {
          type: 'add',
          path: `${components}/${role}/{{properCase componentName}}/{{properCase componentName}}.scss`,
          templateFile: './config/plop/component/component.scss.plop',
        },
        {
          type: 'add',
          path: `${components}/${role}/{{properCase componentName}}/{{properCase componentName}}.test.tsx`,
          templateFile: './config/plop/component/component.test.tsx.plop',
        },
      ];

      const providerActions = [
        {
          type: 'add',
          path: `${providers}/{{properCase componentName}}Provider/index.tsx`,
          templateFile: './config/plop/provider/index.tsx.plop',
        },
        {
          type: 'add',
          path: `${providers}/{{properCase componentName}}Provider/{{properCase componentName}}Provider.tsx`,
          templateFile: `./config/plop/provider/provider.tsx.plop`,
        },
        {
          type: 'add',
          path: `${providers}/{{properCase componentName}}Provider/{{properCase componentName}}Provider.test.tsx`,
          templateFile: './config/plop/provider/provider.test.tsx.plop',
        },
      ];

      let actions = [];

      if (isFunctional(componentType)) {
        actions = componentActions;
      } else if (isProvider(componentType)) {
        actions = providerActions;
      }

      return actions;
    },
  });
};
