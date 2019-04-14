import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { EquityFundingPost } from './shared/models/equity-funding-post.model';
import { FundraisingPost } from './shared/models/fundraising-post.model';
import { EquityFundingService } from './shared/services/equity-funding.service';
import { FundraisingService } from './shared/services/fundraising.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolveGuard
  implements Resolve<{ equityFundingPosts: EquityFundingPost[]; fundraiserPosts: FundraisingPost[] }> {
  constructor(private equityFundingService: EquityFundingService, private fundraisingService: FundraisingService) {}
  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<{ equityFundingPosts: EquityFundingPost[]; fundraiserPosts: FundraisingPost[] }> {
    const fundingPosts: EquityFundingPost[] = await this.equityFundingService.getEquityFundingPosts();
    const raiserPosts: FundraisingPost[] = await this.fundraisingService.getFundraisingPosts();
    return { equityFundingPosts: fundingPosts, fundraiserPosts: raiserPosts };
  }
}
