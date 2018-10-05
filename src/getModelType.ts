import { Model, RoleType, ScopeType } from 'schemaly';
import { GraphQLObjectType } from 'graphql';
import getModelFields from './getModelFields';

interface GetModelType {
  model: Model;
  roles: RoleType[];
  scope: ScopeType[];
  options?: {
    context?: string[]
  };
}

const getModelType = async ({ model, roles, scope, options }: GetModelType) => {
  const { machine } = model;
  return new GraphQLObjectType({
    name: machine,
    fields: await getModelFields({ model, roles, scope, options })
  });
};

export default getModelType;
