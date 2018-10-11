import getTypeForSimple from './getTypeForSimple';
import getTypeForCollection from './getTypeForCollection';
import getTypeForContainer from './getTypeForContainer';
import { isContainer, isRepeater } from 'schemaly';
import { TypeHandler } from './types';

const getBlueprintType = async ({ model, roles, scope, options }: TypeHandler) => {
  if (isContainer(model)) {
    return getTypeForContainer({ model, roles, scope, options });
  } else if (isRepeater(model)) {
    return getTypeForCollection({ model, roles, scope, options });
  } else {
    return getTypeForSimple({ model, roles, scope, options });
  }
};

export default getBlueprintType;
