const setFormChanges = (event, setFormState, formState) => {
//   const {
//     target: { name },
//   } = event;
  const { name, type, checked, value } = event.target;

  const val = type === "checkbox" ? checked : value;

  setFormState({
      ...formState,
      [name]: val
  });
  
//   const value =
//     event.target.type === "checkbox"
//       ? event.target.checked
//       : event.target.value;
//   setFormState({
//     ...formState,
//     [name]: value,
//   });
};

export default setFormChanges;
