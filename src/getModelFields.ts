import { Model, RoleType, ScopeType } from 'schemaly';
import getBlueprintFields from './getBlueprintFields';

interface GetModelFields {
  model: Model;
  roles: RoleType[];
  scope: ScopeType[];
  options?: {
    context?: string[];
  };
}

const getModelFields = async ({
  model,
  roles,
  scope,
  options
}: GetModelFields): Promise<{ [k: string]: any }> => {
  const blueprints = model.blueprints.all();
  return getBlueprintFields({
    blueprints,
    roles,
    scope,
    options
  });
};

export default getModelFields;
