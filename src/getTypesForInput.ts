import { Blueprint, Model, RoleType, ScopeType } from 'schemaly';
import getTypeForContainer from './getTypeForContainer';

interface GetFieldsForQuery {
  models: Array<Model | Blueprint>;
  roles: RoleType[];
  scope: ScopeType[];
  options: any;
}

const getTypesForInput = async ({ models, roles, scope, options }: GetFieldsForQuery) => {
  return models.reduce(async (fields, model) => {
    const oldFields = await fields;
    return {
      ...oldFields,
      [`${model.machine}Input`]: await getTypeForContainer({
        model,
        roles,
        scope,
        options: { ...options, asInput: true, asQuery: false }
      })
    };
  }, Promise.resolve({}));
};

export default getTypesForInput;
