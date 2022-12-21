import joi from 'joi'

export const usersSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).required()
})

export const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).required()
})