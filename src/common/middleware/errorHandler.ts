import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../errors/HttpError";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON body" });
  }

  if (err instanceof ZodError) {
    const issues = err.issues ?? [];
    return res.status(400).json({
      message: "Validation failed",
      details: issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (typeof err === "object" && err !== null) {
    const code = (err as { code?: number }).code;
    if (code === 11000) {
      return res.status(409).json({ message: "resource already exists" });
    }
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({ message: "Internal server error" });
};
