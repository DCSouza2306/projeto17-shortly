
export function schemaValidation(schema, body, res){
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send({ message: errors });
      } 
}