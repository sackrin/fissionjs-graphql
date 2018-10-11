import getObjectWithFieldsType from './getObjectWithFieldsType';
import { Blueprint, Model, Polymorphic, PolyType, RoleType, ScopeType } from 'schemaly';

type ModelTypes = Model | Blueprint | PolyType;

interface GetUnionType {
  model: ModelTypes;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const getUnionSubTypes = async ({ model, roles, scope, options }: GetUnionType): Promise<any> => {
  const blueprints = model.blueprints as Polymorphic;
  return Promise.all(blueprints.types.map(async (subType: any) => ({
    machine: subType.machine,
    type: await getObjectWithFieldsType({
      model: subType,
      roles,
      scope,
      options
    })
  })));
};

export default getUnionSubTypes;
