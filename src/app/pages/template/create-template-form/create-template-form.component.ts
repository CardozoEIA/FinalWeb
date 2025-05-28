import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template/template.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Template } from 'src/app/models/template.model';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-create-template-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-template-form.component.html',
  styleUrl: './create-template-form.component.scss'
})
export class CreateTemplateFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  templateId = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private templateService: TemplateService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.templateId = id;
        this.editMode = true;
        this.getTemplate(id);
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      campoA: ['', Validators.required],
      campoB: ['', Validators.required],
      campoFecha: ['', Validators.required],
      estado: ['Activo', Validators.required],
      descripcion: [''],
      isActive: [true]
    });
  }

  getTemplate(id: string): void {
    this.templateService.getTemplateById(id).subscribe({
      next: (template: Template) => {
        this.form.patchValue(template);
      },
      error: () => {
        this.alertService.ErrorAlert("Error", "Template not found");
      }
    });
  }

  guardarTemplate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.ErrorAlert("Error", "Please fill in all required fields.");
      return;
    }

    const templateData: Template = this.form.value;

    if (this.editMode && this.templateId) {
      this.templateService.updateTemplate(this.templateId, templateData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Success", "Template updated successfully").then(result => {
            if (result.isConfirmed) this.router.navigate(['/templates']);
          });
        },
        error: () => {
          this.alertService.ErrorAlert("Error", "Error updating template");
        }
      });
    } else {
      this.templateService.addTemplate(templateData).subscribe({
        next: () => {
          this.alertService.SuccesAlert("Success", "Template created successfully").then(result => {
            if (result.isConfirmed) this.router.navigate(['/templates']);
          });
        },
        error: () => {
          this.alertService.ErrorAlert("Error", "Error creating template");
        }
      });
    }
  }
}
