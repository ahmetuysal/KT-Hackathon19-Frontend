import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EquityFundingPost } from '../shared/models/equity-funding-post.model';
import { FundraisingPost } from '../shared/models/fundraising-post.model';
import { KtApiService } from '../shared/services/kt-api.service';
import { AuthService } from '../shared/services/auth.service';
import { EquityFundingService } from '../shared/services/equity-funding.service';
import { FundraisingService } from '../shared/services/fundraising.service';
import { FormControl } from '@angular/forms';
import { FundraisingDonation } from '../shared/models/fundraising-donation.model';
import { EquityFundingInvestment } from '../shared/models/equity-funding-investment.model';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {
  errorMessage: string;
  waiting: boolean = false;
  isDonation: boolean;
  donationAmount: FormControl;
  stockAmount: FormControl;
  message: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public post: EquityFundingPost | FundraisingPost,
    private ktApiService: KtApiService,
    private authService: AuthService,
    private equityFundingService: EquityFundingService,
    private fundraisingService: FundraisingService
  ) {
    this.isDonation = this.checkIsDonation(post);
  }

  checkIsDonation(post: EquityFundingPost | FundraisingPost): post is FundraisingPost {
    return (<FundraisingPost>post).targetAmount !== undefined;
  }
  ngOnInit() {
    this.donationAmount = new FormControl();
    this.stockAmount = new FormControl();
    this.message = new FormControl();
  }

  async onSubmit() {
    this.waiting = true;
    if (this.checkIsDonation) {
      const donation = new FundraisingDonation();
      donation.amount = this.donationAmount.value;
      donation.date = new Date();
      donation.fundraisingPostId = this.post.id;
      donation.userId = this.authService.getCurrentUser().id;
      donation.message = this.message.value;
      const result = await this.fundraisingService.postFundraisingDonation(donation);
      if (result) {
        (<FundraisingPost>this.post).fundedAmount += this.donationAmount.value;
      }
    } else {
      const investment = new EquityFundingInvestment();
      investment.date = new Date();
      investment.equityFundingPostId = this.post.id;
      investment.shareCount = this.stockAmount.value;
      investment.userId = this.authService.getCurrentUser().id;
      investment.message = this.message.value;
      const result = await this.equityFundingService.postFundraisingDonation(investment);
      if (result) {
        (<EquityFundingPost>this.post).soldShare += this.stockAmount.value;
      }
    }
    this.waiting = false;
  }
}
