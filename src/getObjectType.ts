import { Blueprint, Blueprints } from 'schemaly';
import { GraphQLInputObjectType, GraphQLObjectType } from 'graphql';
import getBlueprintType from './getBlueprintType';
import { TypeHandler } from './types';

const getObjectType = async ({ model, roles, scope, options }: TypeHandler) => {
  const blueprints = model.blueprints as Blueprints;
  const allBlueprints = blueprints.all();
  const fields = await allBlueprints.reduce(
    async (currentFields: Promise<{ [k: string]: any }>, blueprint: Blueprint) => {
      const oldFields = await currentFields;
      if (!(await blueprint.grant({ roles, scope }))) {
        return oldFields;
      }
      const newFields: { [k: string]: any } = { ...oldFields };
      newFields[blueprint.machine] = await getBlueprintType({
        model: blueprint,
        roles,
        scope,
        options
      });
      return newFields;
    },
    Promise.resolve({})
  );
  return !options.asInput
    ? new GraphQLInputObjectType({
        name: model.machine,
        fields
      })
    : new GraphQLObjectType({
        name: model.machine,
        fields
      });
};

export default getObjectType;
