import { User } from './user.model';

export class FundraisingPost {
  constructor(
    public id?: number,
    public userId?: string,
    public title?: string,
    public targetAmount?: number,
    public deadline?: Date,
    public fundedAmount?: number,
    public description?: string,
    public image?: string,
    public targetIban?: string,
    public user?: User
  ) {}
}
