import { expect } from 'chai';
import getPerson from '../__fakes__/getPerson';
import getProfileData from '../__fakes__/getProfileFields';
import { graphql, GraphQLError, GraphQLObjectType, GraphQLSchema } from 'graphql';
import getTypes from '../getTypes';
import getInputTypes from '../getInputTypes';
import { collideAndProcess, RoleType, ScopeType } from 'schemaly';

describe('getInputTypes', () => {
  const resolveForPerson = async (values: any) => {
    const model = getPerson(() => ({}));
    const person = await collideAndProcess({
      model,
      scope: ['r'],
      roles: ['guest'],
      values,
      options: {}
    });
    // if (dumpedData.valid === false) {
    //   throw new ValidationError(['Rah rah', 'blah blah']);
    // }
    return { person, examples: ['reas','asdds'] };
  };

  const getSchema = async ({ roles, scope }: { roles: RoleType[]; scope: ScopeType[] }) => {
    const models = [getPerson(getProfileData())];
    const queries: any = await getTypes({
      models,
      roles,
      scope,
      options: {}
    });
    const mutators: any = await getInputTypes({
      models,
      roles,
      scope,
      options: {}
    });
    return new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: queries
      }),
      mutation: new GraphQLObjectType({
        name: 'Mutations',
        fields: () => ({
          createPerson: {
            type: queries.person.type,
            args: {
              value: { type: mutators.personInput.type }
            },
            resolve: async (root, args) => {
              const value: { [k: string]: any } = args.value;
              return { person: await resolveForPerson(value), errors: ['I am sparta!'] }
            }
          }
        })
      })
    });
  };

  it('can accept and mutate valid data', async () => {
    const fakeQuery = `
      mutation {
        createPerson(
        value: {
            _id: 333232
            firstName: "Adam"
            surname: "Turner"
          }
        ) {
          _id
          firstName
          surname
        }
      }
    `;
    const fakeResult = await graphql({
      schema: await getSchema({
        roles: ['guest'],
        scope: ['r', 'w']
      }),
      source: fakeQuery
    });
    expect(fakeResult).to.deep.equal({
      data: { createPerson: { _id: 333232, firstName: 'Adam', surname: 'Turner' } }
    });
  });

  it('can accept and return invalid', async () => {
    const fakeQuery = `
      mutation {
        createPerson(
        value: {
            _id: 333232
            firstName: "Adam"
          }
        ) {
          _id
          firstName
          surname
        }
      }
    `;
    const fakeResult = await graphql({
      schema: await getSchema({
        roles: ['guest'],
        scope: ['r', 'w']
      }),
      source: fakeQuery
    });
    console.log(fakeResult);
    expect(fakeResult).to.deep.equal({
      data: { createPerson: { _id: 333232, firstName: 'Adam', surname: 'Turner' } }
    });
  });
});
