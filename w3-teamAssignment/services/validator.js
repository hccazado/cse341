const {body, validationResult} = require("express-validator");

const validationRules = () => {
    return [
        body("firstName").trim().notEmpty().isLength({maximum: 12}).withMessage("firstName is required"),
        body("lastName").trim().notEmpty().isLength({maximum: 12}).withMessage("lastName is required"),
        body("email").trim().notEmpty().isEmail().withMessage("A valid email is required")
    ]
}

const validate = (req, res, next) =>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.path]:err.msg}));
    return res.status(412).json({
        errors: extractedErrors
    });
}

module.exports={
    validationRules,
    validate
}