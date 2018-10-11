import isPoly from './isPoly';
import getObjectWithFieldsType from './getObjectWithFieldsType';
import getUnionType from './getUnionType';
import { Blueprint, Model, PolyType, RoleType, ScopeType } from 'schemaly';

type ModelTypes = Model | Blueprint | PolyType;

interface GetTypeForContainer {
  model: ModelTypes;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const getTypeForContainer = async ({
  model,
  roles,
  scope,
  options
}: GetTypeForContainer) => {
  return {
    name: model.machine,
    type: !isPoly(model)
      ? await getObjectWithFieldsType({ model, roles, scope, options })
      : await getUnionType({ model, roles, scope, options }),
    resolve: model.options.resolve
  };
};

export default getTypeForContainer;
