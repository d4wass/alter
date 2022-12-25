export interface ICrud<T, K, S> {
  findAll(): Promise<T[]>;
  findOne(id: S): Promise<T>;
  create(createDto: K, id: S): Promise<{ vehicleId: S }>;
  update(id: S, updateDto: K): Promise<T>;
  delete(id: S): Promise<T>;
}
