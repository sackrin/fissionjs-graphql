import { RoleType, ScopeType } from 'schemaly';

interface TypeHandler {
  model: any;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

export default TypeHandler;
