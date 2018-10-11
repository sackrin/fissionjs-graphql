import { TypeHandler } from './types';
import { Context } from 'schemaly';

const getTypeForSimple = async ({
  model,
  roles,
  scope,
  options
}: TypeHandler) => {
  const context = model.context as Context;
  return {
    name: model.machine,
    type: options.contexts[context.code] || context.code,
    resolve: model.options.resolve
  };
};

export default getTypeForSimple;
