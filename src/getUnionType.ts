import { GraphQLUnionType } from 'graphql';
import getUnionSubTypes from './getUnionSubTypes';
import { ModelWithPolymorphic, RoleType, ScopeType } from 'schemaly';

interface GetUnionType {
  model: ModelWithPolymorphic;
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
      const { machine } = model.blueprints.resolveType(values);
      const resolvedType = subTypes.find(
        (subType: any) => subType.machine === machine
      );
      return resolvedType ? resolvedType.type : undefined;
    }
  });
};

export default getUnionType;
