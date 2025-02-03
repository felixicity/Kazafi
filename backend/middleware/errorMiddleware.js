const notFound = (req, res, next) => {
      const error = new Error(`Not Found - ${req.originalUrl}`);
      res.status(404);
      next(error);
};

const errorHandler = (err, req, res, next) => {
      let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      let errMessage = err.message;

      if (err.message === "CastError" && err.kind === "ObjectId") {
            statusCode = 404;
            errMessage = "Resource not Found";
      }

      res.status(statusCode).json({ errMessage, stack: process.env.NODE_ENV === "production" ? null : err.stack });
};

export { notFound, errorHandler };
