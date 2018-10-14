import { Blueprint, Model, RoleType, ScopeType } from 'schemaly';
import getTypeForContainer from './getTypeForContainer';

interface GetFieldsForQuery {
  models: Array<Model | Blueprint>;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const getTypesForQuery = async ({ models, roles, scope, options }: GetFieldsForQuery) => {
  return models.reduce(async (fields, model) => {
    const oldFields = await fields;
    return { ...oldFields, [model.machine]: await getTypeForContainer({
        model,
        roles,
        scope,
        options: { ...options, asInput: false, asQuery: true }
      }) };
  }, Promise.resolve({}));
};

export default getTypesForQuery;
