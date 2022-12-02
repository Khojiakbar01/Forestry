module.exports = (validationErrorsArray) => {
  const validationErrObj = {};
  for (let i = 0; i < validationErrorsArray.length; i++) {
    validationErrObj[validationErrorsArray[i].param] =
      validationErrorsArray[i].msg;
  }
  return validationErrObj;
};
