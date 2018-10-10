interface IsPoly {
  model: any;
}

const isPoly = ({ model }: IsPoly) => {
  return !!model.blueprints.types;
};

export default isPoly;
