export interface MutationConverterType {
  add: (string, ArrayOfColumns) => [string, object];
  update: (string, ArrayOfColumns) => [string, object];
  del: (string, ArrayOfColumns) => [string, object];
  stringify: (MutationObject) => string;
}

export interface ResolversType {
  createQuery: (string) => string;
  createMutation: (string, MutationObject) => string;
  checkOwnTable: (string, Tables) => string;
  checkBaseTableCols: (string, ArrayOfColumns) => string;
  checkJoinTableCols: (string, Tables) => string;
}

export interface QueryConverterType {
  createQuerySchema: (string) => void;
}

// export interface SimpleObject {
//   [key: string]: any;
// }

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

export type ArrayOfColumns = Column[];

export interface Tables {
  [key: string]: ArrayOfColumns
}

// export interface SchemaTable {
//   [key: string]: string
// }

export interface MutationTable {
  [key: string]: string
}

export interface MutationObject {
  [key: string]: MutationTable
}
// export type MutationArray = []
 