import getObjectType from './getObjectType';
import { Polymorphic, PolyType } from 'schemaly';
import { TypeHandler } from './Types';

const getUnionSubTypes = async ({ model, roles, scope, options }: TypeHandler): Promise<any[]> => {
  const blueprints = model.blueprints as Polymorphic;
  return Promise.all(
    blueprints.types.map(async (subType: PolyType) => ({
      machine: options.asQuery ? subType.machine : `${subType.machine}Input`,
      type: await getObjectType({
        model: subType,
        roles,
        scope,
        options
      })
    }))
  );
};

export default getUnionSubTypes;
