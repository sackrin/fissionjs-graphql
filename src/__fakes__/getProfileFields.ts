import {
  Field,
  STRING,
  ValidateAll,
  OneOfValidator,
  AllowPolicy,
  GrantOne,
  SimpleValidator
} from 'schemaly';

const getProfileFields = () => [
  Field({
    machine: 'title',
    context: STRING,
    policies: GrantOne([AllowPolicy({ scope: ['*'], roles: ['*'] })]),
    validators: ValidateAll([OneOfValidator({ rules: ['mrs|miss|ms|mr'] })])
  }),
  Field({
    machine: 'firstName',
    context: STRING,
    policies: GrantOne([AllowPolicy({ scope: ['*'], roles: ['*'] })]),
    validators: ValidateAll([SimpleValidator({ rules: ['string|required'] })])
  }),
  Field({
    machine: 'surname',
    context: STRING,
    policies: GrantOne([AllowPolicy({ scope: ['*'], roles: ['*'] })]),
    validators: ValidateAll([SimpleValidator({ rules: ['string|required'] })])
  })
];

export default getProfileFields;
