import { Routes } from '@angular/router';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { CreateTemplateFormComponent } from './create-template-form/create-template-form.component';
import { authGuard } from 'src/app/guards/auth.guard';

export const templateRoutes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: TemplateListComponent
    },
    {
      path: 'updateTemplate/:id',
      component: TemplateFormComponent
    },
    {
      path: 'addTemplate',
      component: CreateTemplateFormComponent
    }
  ],
  canActivate: [authGuard]
}];