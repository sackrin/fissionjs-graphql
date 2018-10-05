import { Schema, Fields, Blueprints, RoleType, ScopeType } from 'schemaly';
import getProfileFields from './getProfileFields';

export interface PersonOptions {
  blueprints?: Blueprints;
  roles?: RoleType[];
  scope?: ScopeType[];
}

const getPerson = ({ ...options }: PersonOptions) =>
  Schema({
    machine: 'person',
    scope: ["r", "w"],
    roles: ["user", "owner"],
    blueprints: Fields([...getProfileFields()]),
    ...options
  });

export default getPerson;
