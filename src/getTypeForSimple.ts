import { TypeHandler } from './types';
import { Context, Model } from 'schemaly';
import getContextMap from './getContextMap';

const getTypeForSimple = async ({ model, roles, scope, options }: TypeHandler) => {
  const context = (model as Model).context as Context;
  const contexts = getContextMap(options);
  return {
    name: model.machine,
    type: contexts[context.code] || context.code,
    resolve: options.asInput ? model.options.resolve : undefined
  };
};

export default getTypeForSimple;
