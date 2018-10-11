import { Schema, Fields, Field, INT, STRING, CONTAINER, COLLECTION, Poly } from 'schemaly';
import getProfileData from './getProfileFields';

const getPerson = () =>
  Schema({
    machine: 'person',
    scope: ['r', 'w'],
    roles: ['user', 'owner'],
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
        ])
      }),
      Field({
        machine: 'phone',
        context: COLLECTION,
        blueprints: Fields([
          Field({ machine: 'number', context: STRING }),
          Field({ machine: 'extension', context: STRING })
        ])
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
          })
      })
    ]),
    options: {
      resolve: () => {
        return getProfileData();
      }
    }
  });

export default getPerson;
