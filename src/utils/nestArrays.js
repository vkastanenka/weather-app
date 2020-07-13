const nestArrays = (arr, filter) => {
  const nestedArr = [];

  const sorterFunc = (arr) => {
    if (arr.length === 0) return;
    const filteredArr = arr.filter((item) => item[filter] === arr[0][filter]);
    nestedArr.push(filteredArr);
    return sorterFunc(arr.slice(filteredArr.length));
  };

  sorterFunc(arr);

  return nestedArr;
};

export default nestArrays;