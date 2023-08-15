export interface ICrud<T, K, S, A = void> {
  findAll?: () => Promise<T[]>;
  findOne: (id: S) => Promise<T>;
  create: (createDto: K, id?: S) => Promise<T | { [key: string]: S }>;
  update: (id: S, updateDto: K | A, userId?: S) => Promise<T>;
  delete: (id: S, userId: S) => Promise<T | void>;
}
