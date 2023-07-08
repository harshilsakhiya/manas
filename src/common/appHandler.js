const successHandler = (res) => {
  const responseData = res?.data?.data ? res.data.data : res.data;

  return {
    success: true,
    data: responseData,
  };
};

const errorHandler = (err) => {
  const { request, response } = err;
  if (response) {
    const { message } = response.data;

    return {
      message: message || "something went wrong",
      success: false,
    };
  } else if (request) {
    //request sent but no response received
    return {
      message: "server time out",
      success: false,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: "opps! something went wrong while setting up request",
      success: false,
    };
  }
};

export { successHandler, errorHandler };
