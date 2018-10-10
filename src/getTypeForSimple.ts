import { TypeHandler } from './types';

const getTypeForSimple = async ({
  model,
  roles,
  scope,
  options
}: TypeHandler) => {
  if (!model.context) {
    return {};
  }
  return {
    name: model.machine,
    type: options.contexts[model.context.code] || model.context.code,
    resolve: model.options.resolve
  };
};

export default getTypeForSimple;
