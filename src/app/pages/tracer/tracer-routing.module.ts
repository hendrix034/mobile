import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracerPage } from './tracer.page';

const routes: Routes = [
  {
    path: '',
    component: TracerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracerPageRoutingModule {}
