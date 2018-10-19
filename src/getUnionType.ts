import { GraphQLUnionType } from 'graphql';
// @ts-ignore
import UnionInputType from 'graphql-union-input-type';
import getUnionSubTypes from './getUnionSubTypes';
import { Polymorphic } from 'schemaly';
import { TypeHandler } from './Types';

const getUnionType = async ({ model, roles, scope, options }: TypeHandler) => {
  const subTypes = await getUnionSubTypes({ model, roles, scope, options });
  return options.asInput
    ? new UnionInputType({
        name: options.asQuery ? model.machine : `${model.machine}Input`,
        types: subTypes.map((subType: any) => subType.type),
        resolveType: async (values: any) => {
          const blueprints = model.blueprints as Polymorphic;
          const machine = blueprints.resolveType(values).machine;
          const resolvedType = subTypes.find((subType: any) => subType.machine === machine);
          return resolvedType ? resolvedType.type : undefined;
        }
      })
    : new GraphQLUnionType({
        name: options.asQuery ? model.machine : `${model.machine}Input`,
        types: subTypes.map((subType: any) => subType.type),
        resolveType: async values => {
          const blueprints = model.blueprints as Polymorphic;
          const machine = blueprints.resolveType(values).machine;
          const resolvedType = subTypes.find((subType: any) => subType.machine === machine);
          return resolvedType ? resolvedType.type : undefined;
        }
      });
};

export default getUnionType;
