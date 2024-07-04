const updatePosts = (mainArray, subArray, dispatch, setArray) => {
  const updateArray = mainArray.map((post) => {
    const matchingItem = subArray.find((item) => item.id === post.id);
    return matchingItem ? { ...post, ...matchingItem } : post;
  });
  dispatch(setArray(updateArray));
};

export default updatePosts;
