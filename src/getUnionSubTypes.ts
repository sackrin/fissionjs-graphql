import getObjectWithFieldsType from './getObjectWithFieldsType';
import { RoleType, ScopeType } from 'schemaly';

interface GetUnionType {
  model: any;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const getUnionSubTypes = async ({ model, roles, scope, options }: GetUnionType): Promise<any> => {
  return Promise.all(model.blueprints.types.map(async (subType: any) => ({
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
