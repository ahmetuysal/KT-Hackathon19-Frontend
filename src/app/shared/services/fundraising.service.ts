import { Injectable } from '@angular/core';
import { FundraisingPost } from '../models/fundraising-post.model';
import { ApiService } from './api.service';
import { FundraisingDonation } from '../models/fundraising-donation.model';

@Injectable({
  providedIn: 'root'
})
export class FundraisingService {
  constructor(private apiService: ApiService) {}

  async createFundraisingPost(raisingPost: FundraisingPost): Promise<boolean> {
    const result = await this.apiService.post('fundraising-post', { fundraisingPost: raisingPost }).toPromise();
    if (result.StatusToken && result.StatusToken == 201) {
      return true;
    } else {
      return false;
    }
  }

  async getFundraisingPosts(): Promise<FundraisingPost[]> {
    const result = await this.apiService.get('fundraising-post').toPromise();

    if (result.fundraisingPosts) {
      return result.fundraisingPosts;
    }
    return null;
  }

  async postFundraisingDonation(donation: FundraisingDonation): Promise<boolean> {
    const result = await this.apiService.post('fundraising-donations', { fundraisingDonation: donation }).toPromise();
    if (result.StatusToken && result.StatusToken == 201) {
      return true;
    } else {
      return false;
    }
  }
}
