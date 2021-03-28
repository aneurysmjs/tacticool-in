const { src } = require('../paths');

const components = `${src}/app/components`;

const templatesPath = './component';

module.exports = function plopFn(plop) {
  plop.setGenerator('React Component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'prompt',
        name: 'componentName',
        message: 'Name of your component:',
        default: 'test'
      },
      {
        type: 'list',
        name: 'quantity',
        message: 'how many components you want to create',
        choices: [
          1,
          100,
          1000,
          5000,
        ]
      }
    ],
    actions({ quantity, componentName }) {
      let actionsForComponents = [];

      for (let i = 0; i <= quantity; i += 1) {
        let j = i;
        actionsForComponents = [
          ...actionsForComponents,
          {
            type: 'addMany',
            base: templatesPath,
            destination: `${components}/{{properCase componentName}}${i}`,
            templateFiles:`${templatesPath}/**`,
            stripExtensions: ['plop'],
            data: {
              fullComponentName: `${componentName}${j}`,
              count: j += 1,
              isLastComponent: j < quantity,
              nextComponent: `${componentName}${j}`
            }
          }
        ];
      }

      return actionsForComponents;
    },
  });

};
