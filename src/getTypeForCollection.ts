import getObjectWithFieldsType from './getObjectWithFieldsType';
import getUnionType from './getUnionType';
import { GraphQLList } from 'graphql';
import { TypeHandler } from './types';
import { isPolymorphic } from 'schemaly';

const getTypeForCollection = async ({ model, roles, scope, options }: TypeHandler) => {
  return {
    name: model.machine,
    type: new GraphQLList(
      !isPolymorphic(model)
        ? await getObjectWithFieldsType({ model, roles, scope, options })
        : await getUnionType({ model, roles, scope, options })
    ),
    resolve: model.options.resolve
  };
};

export default getTypeForCollection;
