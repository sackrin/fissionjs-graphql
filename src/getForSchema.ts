import getTypeForContainer from './getTypeForContainer';
import { Blueprint, Model, PolyType, RoleType, ScopeType } from 'schemaly';

type ModelTypes = Model | Blueprint | PolyType;

interface GetForSchema {
  model: ModelTypes;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const getForSchema = ({ model, roles, scope, options }: GetForSchema) =>
  getTypeForContainer({
    model,
    roles,
    scope,
    options
  });

export default getForSchema;
