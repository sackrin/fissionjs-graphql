import isPoly from './isPoly';
import getObjectWithFieldsType from './getObjectWithFieldsType';
import getUnionType from './getUnionType';
import { GraphQLList } from 'graphql';
import { TypeHandler } from './types';

const getTypeForCollection = async ({ model, roles, scope, options }: TypeHandler) => {
  return {
    name: model.machine,
    type: new GraphQLList(
      !isPoly({ model })
        ? await getObjectWithFieldsType({ model, roles, scope, options })
        : await getUnionType({ model, roles, scope, options })
    ),
    resolve: model.options.resolve
  };
};

export default getTypeForCollection;
