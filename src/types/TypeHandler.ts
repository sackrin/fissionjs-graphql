import { Blueprint, Model, PolyType, RoleType, ScopeType } from 'schemaly';

interface TypeHandler {
  model: Model | Blueprint | PolyType;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

export default TypeHandler;
