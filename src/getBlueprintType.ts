import getTypeForSimple from './getTypeForSimple';
import getTypeForCollection from './getTypeForCollection';
import getTypeForContainer from './getTypeForContainer';
import {
  RoleType,
  ScopeType
} from 'schemaly';

interface GetBlueprintType {
  model: any;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const getBlueprintType = async ({
  model,
  roles,
  scope,
  options
}: GetBlueprintType) => {
  if ('context' in model) {
    if (model.context.children && !model.context.repeater) {
      return getTypeForContainer({ model, roles, scope, options });
    } else if (model.context.children && model.context.repeater) {
      return getTypeForCollection({ model, roles, scope, options });
    }
  } else {
    return getTypeForSimple({ model, roles, scope, options });
  }
};

export default getBlueprintType;
