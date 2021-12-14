export interface MutationConverterType {
  add: (string, ArrayOfColumns) => [string, object];
  update: (string, ArrayOfColumns) => [string, object];
  del: (string, ArrayOfColumns) => [string, object];
  stringify: (MutationObject) => string;
}

export interface QueryConverterType {
  createQuerySchema: (string) => void;
}

export interface typeConverterType {
  sortTables: (allTables, baseTables, joinTables) => any;
  createBaseTableQuery: (baseTables) => ArrayOfColumns;
  createInitialTypeDef: (baseTableName, baseTables, baseTableQuery) => StringObject;
  addForeignKeysToTypeDef: (joinTableName, schema, joinTables) => void;
  finalizeTypeDef: (schema) => string;
}

// interface EnumServiceItems extends Array<EnumServiceItem>{}

// // https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects
export interface Column {
  column_name: string,
  table_name: string,
  data_type: string,
  character_maximum_length: number | null,
  is_nullable: string,
  constraint_name: string | null,
  constraint_type: string | null,
  foreign_table: string | null,
  foreign_column: string | null
}

export interface StringObject {
  [key: string]: string;
}

export type ArrayOfColumns = Column[];

export interface Tables {
  [key: string]: ArrayOfColumns
}

export interface SchemaTable {
  [key: string]: StringObject
}

export interface MutationTable {
  [key: string]: string
}

export interface MutationObject {
  [key: string]: MutationTable
}



// export interface typeConverterType {
//   sortTables: () => object;
//   createBaseTableQuery: () => ArrayOfColumns;
//   createInitialTypeDef: () => StringObject;
//   addForeignKeysToTypeDef: () => void;
//   finalizeTypeDef: () => string;
// }
// export type MutationArray = []