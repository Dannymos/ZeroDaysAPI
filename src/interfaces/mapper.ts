export default interface Mapper<M, D> {
  toDTO: (M) => D;
  toModel: (D) => M;
}
