import { Injectable } from '@angular/core';
import { FundraisingPost } from '../models/fundraising-post.model';
import { ApiService } from './api.service';

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
}
