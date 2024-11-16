const {body, validationResult} = require("express-validator");

const validationRules = () =>{
    return[
        body("firstName").trim().notEmpty().withMessage("Customer name is required"),
        body("lastName").trim().notEmpty().withMessage("Customer last name is required"),
        body("email").trim().notEmpty().isEmail().normalizeEmail().withMessage("A valid email is required")
    ]
}

const validate = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    const extractedErrors = [];
    errors.array().map(error => extractedErrors.push({[error.path]:[error.msg]}));
    return res.status(412).json({
        errors: extractedErrors
    });
}

module.exports = {
    validate,
    validationRules
}