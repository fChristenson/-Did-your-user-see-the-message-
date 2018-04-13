const Message = (id, message, isViewed = false) => {
  return {
    id,
    message,
    isViewed
  };
};

module.exports = Message;
