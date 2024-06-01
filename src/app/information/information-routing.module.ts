import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { ShippingAndDeliveryComponent } from './shipping-and-delivery/shipping-and-delivery.component';
import { CancellationAndRefundComponent } from './cancellation-and-refund/cancellation-and-refund.component';

const routes: Routes = [
  {path:'policy',component:PrivacyPolicyComponent},
  {path:'terms',component:TermsAndConditionComponent},
  {path:'shipping',component:ShippingAndDeliveryComponent},
  {path:'cancellation',component:CancellationAndRefundComponent},

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
