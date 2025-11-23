export const success = (res, message, data = null) => {
  return res.json({
    success: true,
    message,
    data,
  });
};

export const error = (res, message, status = 400, errorCode = null) => {
  return res.status(status).json({
    success: false,
    message,
    errorCode,
  });
};