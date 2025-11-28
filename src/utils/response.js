export const success = (res, data, message, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const error = (res, status, message, errorCode = null) => {
  return res.status(status).json({
    success: false,
    message,
    errorCode,
  });
};