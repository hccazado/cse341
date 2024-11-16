const {body, validationResult} = require("express-validator");

const validationRules = () => {
    return [
        body("title").trim().notEmpty().withMessage("A book title is required"),
        body("isbn").trim().notEmpty().withMessage("Book ISBN is required"),
        body("author").trim().notEmpty().withMessage("Book Author is required"),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }

    const extractedErrors = [];
    errors.array().map(error => extractedErrors.push({[error.path]: [error.msg]}));
    return res.status(412).json({error: extractedErrors});
}

module.exports = {
    validationRules,
    validate
}