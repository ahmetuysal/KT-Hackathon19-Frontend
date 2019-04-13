export class FundraisingDonation {
  constructor(
    public userId?: string,
    public fundraisingPostId?: number,
    public amount?: number,
    public message?: string,
    public date?: Date
  ) {}
}
