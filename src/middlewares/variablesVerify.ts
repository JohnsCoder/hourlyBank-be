export default (variables: Object) => {
  const variablesList = Object.values(variables);
  for (const variable of variablesList) {
    if (!variable) {
      throw new Error("Empty Values!");
    }
  }
};
