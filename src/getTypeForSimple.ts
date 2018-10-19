import { TypeHandler } from './Types';
import { Context, Model } from 'schemaly';
import getContextMap from './getContextMap';

const getTypeForSimple = async ({ model, roles, scope, options }: TypeHandler) => {
  const context = (model as Model).context as Context;
  const contexts = getContextMap(options);
  return {
    name: model.machine,
    type: contexts[context.code] || context.code,
    ...(options.asQuery && { resolve: model.options.resolve })
  };
};

export default getTypeForSimple;
