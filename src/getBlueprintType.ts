import getTypeForSimple from './getTypeForSimple';
import getTypeForCollection from './getTypeForCollection';
import getTypeForContainer from './getTypeForContainer';
import {
  Model,
  PolyType,
  RoleType,
  ScopeType,
  Blueprint
} from 'schemaly';

type ModelTypes = Model | Blueprint | PolyType;

interface GetBlueprintType {
  model: ModelTypes;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const isContainer = (model: ModelTypes) => {
  const context = (model as Blueprint).context;
  return context !== undefined ? (context.children && !context.repeater) : false ;
};

const isRepeater = (model: ModelTypes) => {
  const context = (model as Blueprint).context;
  return context !== undefined ? (context.children && context.repeater) : false ;
};

const getBlueprintType = async ({
  model,
  roles,
  scope,
  options
}: GetBlueprintType) => {
  if (isContainer(model)) {
    return getTypeForContainer({ model, roles, scope, options });
  } else if (isRepeater(model)) {
    return getTypeForCollection({ model, roles, scope, options });
  } else {
    return getTypeForSimple({ model, roles, scope, options });
  }
};

export default getBlueprintType;
