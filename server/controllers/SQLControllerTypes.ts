// import { Request, Response } from 'express';

export interface SQLControllerType {
  getAllMetadata: (request, response, next) => void;
  formatQueryResult: (request, response, next) => void;
}
