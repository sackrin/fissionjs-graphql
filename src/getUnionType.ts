import { GraphQLUnionType } from 'graphql';
import getUnionSubTypes from './getUnionSubTypes';
import {
  Blueprint,
  Model,
  Polymorphic,
  PolyType,
  RoleType,
  ScopeType
} from 'schemaly';

type ModelTypes = Model | Blueprint | PolyType;

interface GetUnionType {
  model: ModelTypes;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const getUnionType = async ({ model, roles, scope, options }: GetUnionType) => {
  const subTypes = await getUnionSubTypes({ model, roles, scope, options });
  return new GraphQLUnionType({
    name: model.machine,
    types: subTypes.map((subType: any) => subType.type),
    resolveType: async values => {
      const blueprints = model.blueprints as Polymorphic;
      const machine = blueprints.resolveType(values).machine;
      const resolvedType = subTypes.find(
        (subType: any) => subType.machine === machine
      );
      return resolvedType ? resolvedType.type : undefined;
    }
  });
};

export default getUnionType;
