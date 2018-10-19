import { GraphQLScalarType } from 'graphql';

interface HandlerOptions {
  asQuery: boolean;
  asInput: boolean;
  context?: { [k: string]: GraphQLScalarType };
}

export default HandlerOptions;
