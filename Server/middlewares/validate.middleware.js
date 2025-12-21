export const validate = (schema, property = "body") => (req, res, next) => {
    const input = req[property]; // "body", "params", or "query"
    const result = schema.safeParse(input);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues[0].message,
        });
    }

    req[property] = result.data; // overwrite with typed & validated data
    next();
};
