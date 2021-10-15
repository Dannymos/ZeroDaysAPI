export default interface AdapterInterface<M, D> {
  toDTO: (model: M) => D;
  toModel: (dto: D) => M;
}
