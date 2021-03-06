import { Injectable } from '@angular/core';
import { EquityFundingPost } from '../models/equity-funding-post.model';
import { ApiService } from './api.service';
import { EquityFundingInvestment } from '../models/equity-funding-investment.model';

@Injectable({
  providedIn: 'root'
})
export class EquityFundingService {
  constructor(private apiService: ApiService) {}

  async createEquityFundingPost(equityPost: EquityFundingPost): Promise<boolean> {
    const result = await this.apiService.post('equity-funding-post', { equityFundingPost: equityPost }).toPromise();
    if (result.StatusToken && result.StatusToken == 201) {
      return true;
    } else {
      return false;
    }
  }

  async getEquityFundingPosts(): Promise<EquityFundingPost[]> {
    const result = await this.apiService.get('equity-funding-post').toPromise();

    if (result.equityFundingPosts) {
      return result.equityFundingPosts;
    }
    return null;
  }

  async postEquityInvestment(investment: EquityFundingInvestment): Promise<boolean> {
    const result = await this.apiService
      .post('equity-funding-investments', { equityFundingInvestment: investment })
      .toPromise();
    if (result.StatusToken && result.StatusToken == 201) {
      return true;
    } else {
      return false;
    }
  }
}
