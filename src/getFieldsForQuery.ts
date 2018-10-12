import { Blueprint, Model, RoleType, ScopeType } from 'schemaly';
import getTypeForContainer from './getTypeForContainer';

interface GetFieldsForQuery {
  models: Array<Model | Blueprint>;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const getFieldsForQuery = async ({ models, roles, scope, options }: GetFieldsForQuery) => {
  return models.reduce(async (fields, model) => {
    const oldFields = await fields;
    return { ...oldFields, [model.machine]: await getTypeForContainer({ model, roles, scope, options }) };
  }, Promise.resolve({}));
};

export default getFieldsForQuery;
