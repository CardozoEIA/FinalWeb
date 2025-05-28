import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Template } from 'src/app/models/template.model';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-template-list',
  imports: [MaterialModule, CommonModule],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.scss'
})
export class TemplateListComponent {
  templateList: Template[] = [];

  constructor(private templateService: TemplateService, private router: Router) {}

  ngOnInit() {
    this.getTemplates();
  }

  getTemplates() {
    this.templateService.getTemplates().subscribe({
      next: (res) => {
        this.templateList = res;
      },
      error: (err) => {
        if (err.status === 403) {
          localStorage.removeItem('AuthToken');
        }
      }
    });
  }

  goToEditTemplate(template: Template) {
    this.router.navigate(['updateTemplate/form', template.id]);
  }

  goToCreateTemplate() {
    this.router.navigate(['template/addTemplate']);
  }

  deleteTemplate(template: Template) {
    this.templateService.deleteTemplate(template.id!).subscribe({
      next: () => {
        new AlertService().SuccesAlert('Eliminado', 'El template fue eliminado correctamente');
        this.getTemplates();
      },
      error: () => {
        new AlertService().ErrorAlert('Error', 'No se pudo eliminar el template');
      }
    });
  }
}
