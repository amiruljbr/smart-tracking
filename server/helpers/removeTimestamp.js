const removeTimestamp = (data) => {
  delete data.createdAt;
  delete data.updatedAt;
  
  return data;
}

module.exports = removeTimestamp;