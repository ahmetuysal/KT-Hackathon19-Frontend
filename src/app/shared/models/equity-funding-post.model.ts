import { User } from './user.model';

export class EquityFundingPost {
  constructor(
    public id?: string,
    public userId?: string,
    public title?: string,
    public sharePrice?: number,
    public targetShare?: number,
    public deadline?: Date,
    public soldShare?: number,
    public description?: string,
    public image?: string,
    public user?: User
  ) {}
}
