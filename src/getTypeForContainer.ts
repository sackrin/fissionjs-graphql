import isPoly from './isPoly';
import getObjectWithFieldsType from './getObjectWithFieldsType';
import getUnionType from './getUnionType';
import { TypeHandler } from './types';

const getTypeForContainer = async ({
  model,
  roles,
  scope,
  options
}: TypeHandler) => {
  return {
    name: model.machine,
    type: !isPoly({ model })
      ? await getObjectWithFieldsType({ model, roles, scope, options })
      : await getUnionType({ model, roles, scope, options }),
    resolve: model.options.resolve
  };
};

export default getTypeForContainer;
