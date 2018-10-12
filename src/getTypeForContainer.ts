import getObjectType from './getObjectType';
import getUnionType from './getUnionType';
import { isPolymorphic } from 'schemaly';
import { TypeHandler } from './types';

const getTypeForContainer = async ({ model, roles, scope, options }: TypeHandler) => {
  return {
    name: model.machine,
    type: !isPolymorphic(model)
      ? await getObjectType({ model, roles, scope, options })
      : await getUnionType({ model, roles, scope, options }),
    resolve: model.options.resolve
  };
};

export default getTypeForContainer;
