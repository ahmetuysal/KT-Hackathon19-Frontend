import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EquityFundingPost } from '../shared/models/equity-funding-post.model';
import { FundraisingPost } from '../shared/models/fundraising-post.model';
import { KtApiService } from '../shared/services/kt-api.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public post: EquityFundingPost | FundraisingPost,
    private ktApiService: KtApiService
  ) {}

  ngOnInit() {}
}
