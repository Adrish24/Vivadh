const updateArray = (bool,dispatch, tmpArray, setArray) => {
    if (bool) {
        dispatch(setArray(tmpArray));
      } else {
        setArray(tmpArray);
      }
}


export default updateArray;