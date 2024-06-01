import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { CancellationAndRefundComponent } from './cancellation-and-refund/cancellation-and-refund.component';
import { ShippingAndDeliveryComponent } from './shipping-and-delivery/shipping-and-delivery.component';


@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsAndConditionComponent,
    CancellationAndRefundComponent,
    ShippingAndDeliveryComponent
  ],
  imports: [
    CommonModule,
    InformationRoutingModule
  ]
})
export class InformationModule { }
