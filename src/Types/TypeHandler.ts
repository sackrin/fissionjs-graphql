import { Blueprint, Model, PolyType, RoleType, ScopeType } from 'schemaly';
import HandlerOptions from './HandlerOptions';

interface TypeHandler {
  model: Model | Blueprint | PolyType;
  roles: RoleType[];
  scope: ScopeType[];
  options: HandlerOptions;
}

export default TypeHandler;
