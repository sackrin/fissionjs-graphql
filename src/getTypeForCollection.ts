import getObjectType from './getObjectType';
import getUnionType from './getUnionType';
import { GraphQLList } from 'graphql';
import { TypeHandler } from './types';
import { isPolymorphic } from 'schemaly';

const getTypeForCollection = async ({ model, roles, scope, options }: TypeHandler) => {
  return {
    name: model.machine,
    type: new GraphQLList(
      !isPolymorphic(model)
        ? await getObjectType({ model, roles, scope, options })
        : await getUnionType({ model, roles, scope, options })
    ),
    resolve: options.asQuery ? model.options.resolve : undefined
  };
};

export default getTypeForCollection;
