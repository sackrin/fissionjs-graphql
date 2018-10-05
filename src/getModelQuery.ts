import { Model, RoleType, ScopeType } from 'schemaly';
import { GraphQLObjectType } from 'graphql';
import getModelType from './getModelType';

interface Dragons {
  name: string;
  type: GraphQLObjectType;
  resolve: () => Promise<{}>;
}

interface GetModelQuery {
  model: Model;
  roles: RoleType[];
  scope: ScopeType[];
  options?: {
    context?: string[]
  }
}

const getModelQuery = async ({ model, roles, scope, options }: GetModelQuery): Promise<Dragons> => {
  const { machine } = model;
  return {
    name: machine,
    type: await getModelType({ model, roles, scope, options }),
    resolve: async () => {
      return {
        _id: 1221,
        firstName: 'John'
      };
    }
  };
};

export default getModelQuery;
