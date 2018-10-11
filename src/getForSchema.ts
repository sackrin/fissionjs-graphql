import getTypeForContainer from './getTypeForContainer';
import { TypeHandler } from './types';

const getForSchema = ({ model, roles, scope, options }: TypeHandler) =>
  getTypeForContainer({
    model,
    roles,
    scope,
    options
  });

export default getForSchema;
