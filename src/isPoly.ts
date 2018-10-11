import { Blueprint, Model, Polymorphic, PolyType } from 'schemaly';

type ModelTypes = Model | Blueprint | PolyType;

const isPoly = (model: ModelTypes) => {
  const blueprints = model.blueprints as Polymorphic;
  return blueprints.types !== undefined;
};

export default isPoly;
