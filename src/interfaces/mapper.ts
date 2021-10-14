export default interface Mapper<M, D> {
  toDTO: (model: M) => D;
  toModel: (dto: D) => M;
}
