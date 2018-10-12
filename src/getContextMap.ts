import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLString
} from 'graphql';

interface Options {
  context?: { [k: string]: GraphQLScalarType };
}

const getContextMap = (options: Options): { [k: string]: GraphQLScalarType } => {
  return {
    string: GraphQLString,
    int: GraphQLInt,
    boolean: GraphQLBoolean,
    float: GraphQLFloat,
    ...(options.context || {})
  };
};

export default getContextMap;
