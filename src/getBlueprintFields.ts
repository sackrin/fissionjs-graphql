import { Blueprint, RoleType, ScopeType } from 'schemaly';
import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID,
  GraphQLScalarType
} from 'graphql';

interface GetBlueprintFields {
  blueprints: Blueprint[];
  roles: RoleType[];
  scope: ScopeType[];
  options?: {
    context?: string[];
  };
}

const contextList: { [k: string]: GraphQLScalarType } = {
  string: GraphQLString,
  int: GraphQLInt,
  float: GraphQLFloat,
  id: GraphQLID
};

const getBlueprintFields = async ({
  blueprints,
  roles,
  scope,
  options
}: GetBlueprintFields): Promise<{ [k: string]: any }> => {
  return blueprints.reduce(
    async (curr: Promise<{ [k: string]: any }>, field: Blueprint) => {
      if (!(await field.grant({ roles, scope }))) {
        return curr;
      }
      return {
        ...(await curr),
        [field.machine]: contextList[field.context.code]
      };
    },
    Promise.resolve({})
  );
};

export default getBlueprintFields;
