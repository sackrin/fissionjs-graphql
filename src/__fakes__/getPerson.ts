import {
  Schema,
  Fields,
  Field,
  INT,
  STRING,
  CONTAINER,
  COLLECTION,
  Poly,
  GrantOne,
  DenyPolicy,
  AllowPolicy
} from 'schemaly';

const UserReadPolicies = () => GrantOne([
  DenyPolicy({ roles: ["*"], scope: ["*"] }),
  AllowPolicy({ roles: ["user"], scope: ["r"] }),
  AllowPolicy({ roles: ["owner"], scope: ["r","w"] }),
]);

const getPerson = (resolveData: {[k: string]: any}) =>
  Schema({
    machine: 'person',
    scope: ['r', 'w'],
    roles: ['user', 'owner', 'admin'],
    blueprints: Fields([
      Field({ machine: '_id', context: INT }),
      Field({ machine: 'firstName', context: STRING }),
      Field({
        machine: 'surname',
        context: STRING
      }),
      Field({
        machine: 'company',
        context: CONTAINER,
        blueprints: Fields([
          Field({ machine: 'name', context: STRING }),
          Field({ machine: 'abn', context: STRING })
        ]),
        policies: UserReadPolicies()
      }),
      Field({
        machine: 'phone',
        context: COLLECTION,
        blueprints: Fields([
          Field({ machine: 'number', context: STRING }),
          Field({ machine: 'extension', context: STRING })
        ]),
        policies: UserReadPolicies()
      }),
      Field({
        machine: 'address',
        context: COLLECTION,
        blueprints: Poly()
          .type({
            machine: 'office',
            blueprints: Fields([
              Field({ machine: 'pobox', context: STRING }),
              Field({ machine: 'suburb', context: STRING }),
              Field({ machine: 'country', context: STRING })
            ]),
            matchers: [['pobox']]
          })
          .type({
            machine: 'physical',
            blueprints: Fields([
              Field({ machine: 'street', context: STRING }),
              Field({ machine: 'suburb', context: STRING }),
              Field({ machine: 'country', context: STRING })
            ]),
            matchers: [['street']]
          }),
        policies: UserReadPolicies()
      })
    ]),
    options: {
      resolve: () => {
        return resolveData;
      }
    }
  });

export default getPerson;
