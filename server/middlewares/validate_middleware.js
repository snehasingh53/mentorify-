const validate = (schema) => async (req, res, next) => {
    try {
        
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody; 
        next(); 
    } catch (err) {
        const status = 422;
        const message = "Validation error";

        if (err.errors && err.errors.length > 0) {
            extraDetails = err.errors.map((error) => {
                const path = error.path.join('.');
                return `${path}: ${error.message}`;
            }).join('; ');
        }

        const error = {
            status,
            message,
            extraDetails,
        };

        console.log(error);
        next(error);
     }
};
    



module.exports = validate;

