export class EquityFundingInvestment {
  constructor(
    public userId?: string,
    public equityFundingPostId?: number,
    public shareCount?: number,
    public message?: string,
    public date?: Date
  ) {}
}
