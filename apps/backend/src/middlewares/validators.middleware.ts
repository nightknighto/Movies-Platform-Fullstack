import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, type z } from 'zod';
/**
 * Namespace containing various validation middlewares for Express routes.
 */
export namespace Validators {
    function isZodError(error: any): error is ZodError {
        return error instanceof ZodError || error?.name === 'ZodError';
    }

    function validate(schema: z.ZodType, key: 'params' | 'query' | 'body') {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // Parse the request data using the schema. If the data is invalid, a ZodError will be thrown.
                // Also filters out any additional properties not defined in the schema.
                req[key] = schema.parse(req[key]);
                next();
            } catch (error) {
                console.log('Error in validating request: ', error);
                if (isZodError(error)) {
                    const errorMessages = error.issues.map((issue) => ({
                        message: `${key}.${issue.path.join('.')} is ${issue.message}`,
                    }));

                    res.status(StatusCodes.BAD_REQUEST).json({
                        message: 'Invalid data',
                        details: errorMessages,
                    });
                } else {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        message: 'Internal Server Error',
                    });
                }
            }
        };
    }

    /**
     * Middleware function to validate the request body against a given Zod schema.
     *
     * @param schema - The Zod schema to validate the request body against.
     * @returns A middleware function that validates the request body.
     *
     * @example
     * // Usage in an Express route
     * app.post('/route', validateBody(schema), (req, res) => {
     *  // Your route handler logic here
     * });
     *
     * @remarks
     * If the request body does not match the schema, the middleware will respond with a 400 Bad Request status
     * and a JSON error message containing details about the validation errors.
     *
     */
    export function validateBody(schema: z.ZodType) {
        return validate(schema, 'body');
    }

    /**
     * Middleware to validate that specified route parameters are numeric.
     *
     * @param params - An array of parameter names to validate.
     * @returns An Express middleware function that checks if the specified parameters are numeric.
     *
     * @example
     * // Usage in an Express route
     * app.get('/route/:id', validateNumericParams(['id']), (req, res) => {
     *   // Your route handler logic here
     * });
     *
     * @remarks
     * If any of the specified parameters are not numeric or are empty strings,
     * the middleware will respond with a 400 Bad Request status and a JSON error message.
     *
     */
    export function validateNumericParams(params: string[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            for (const param of params) {
                // Check if the parameter is not a number or is an empty string
                if (Number.isNaN(Number(req.params[param])) || req.params[param]?.trim() === '') {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        message: `${param} parameter must be a number`,
                    });
                    return;
                }
            }

            next();
        };
    }

    export function validateOptionalQuery(params: string[], numericParams?: string[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            for (const param of params) {
                const value = req.query[param];

                // Skip if the query param is not provided
                if (value === undefined) {
                    continue;
                }

                // If provided but empty string
                if (typeof value === 'string' && value.trim() === '') {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        message: `${param} query must not be empty if provided`,
                    });
                    return;
                }

                const isNumericParam = numericParams?.includes(param);
                if (isNumericParam && Number.isNaN(Number(value))) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        message: `${param} query must be a valid number`,
                    });
                    return;
                }

                if (typeof value !== 'string') {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        message: `${param} query must be a string`,
                    });
                    return;
                }
            }

            next();
        };
    }

    export function validateParams(schema: z.ZodType) {
        return validate(schema, 'params');
    }
}
