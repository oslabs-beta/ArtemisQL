export interface mutationConverterType {
  add: (request, response, next) => void;
}

interface SimpleObject {
  [key: string]: any;
}

interface EnumServiceItem {
  id: number; label: string; key: any
}

interface EnumServiceItems extends Array<EnumServiceItem>{}

// https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects