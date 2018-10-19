import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLString
} from 'graphql';
import { HandlerOptions } from './Types';

const getContextMap = (options: HandlerOptions): { [k: string]: GraphQLScalarType } => {
  return {
    string: GraphQLString,
    int: GraphQLInt,
    boolean: GraphQLBoolean,
    float: GraphQLFloat,
    ...(options.context || {})
  };
};

export default getContextMap;
