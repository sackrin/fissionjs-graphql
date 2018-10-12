import { Blueprint, Blueprints } from 'schemaly';
import { GraphQLObjectType } from 'graphql';
import getBlueprintType from './getBlueprintType';
import { TypeHandler } from './types';

const getObjectType = async ({ model, roles, scope, options }: TypeHandler) => {
  const blueprints = model.blueprints as Blueprints;
  const allBlueprints = blueprints.all();
  const fields = await allBlueprints.reduce(
    async (currentFields: Promise<Blueprint[]>, blueprint: Blueprint) => {
      const oldFields = await currentFields;
      if (!(await blueprint.grant({ roles, scope }))) {
        return oldFields;
      }
      const newFields: any = { ...oldFields };
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
  return new GraphQLObjectType({
    name: model.machine,
    fields
  });
};

export default getObjectType;
