// import { Request, Response } from 'express';

export interface SQLControllerType {
  getAllMetadata: (request, response, next) => void;
  formatQueryResult: (request, response, next) => void;
}

export interface GQLControllerType {
  createSchemaTypeDefs: (request, response, next) => void;
  createSchemaQuery: (request, response, next) => void;
  createSchemaMutation: (request, response, next) => void;
  createResolver: (request, response, next) => void;
}

export interface MutationObjectType {
  [key: string]: any;
}
