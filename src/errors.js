// errors.js

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UserNotFoundError extends AppError {
  constructor() {
    super("用户不存在", 404);
  }
}

class PasswordIncorrectError extends AppError {
  constructor() {
    super("密码错误", 401);
  }
}

module.exports = {
  AppError,
  UserNotFoundError,
  PasswordIncorrectError,
};
