export const getInputsValue = (inputs) => {
  return inputs.reduce((user, item) => {
    user[item.name] = item.value.trim();
    return user;
  }, {});
};

// #REVIEW:
// const getInputsValue = (inputs) => {
//   return inputs.reduce((user, item) => {
//     user[item.name] = item.value.trim();
//     return user;
//   }, {});
// };

// export default getInputsValue;
