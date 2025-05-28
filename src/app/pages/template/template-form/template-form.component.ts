import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  imports: [ MaterialModule]
})
export class TemplateFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false; // bandera para cambiar texto del botón

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      campoA: [''],
      campoB: [''],
      campoFecha: [''],
      estado: [''],
      descripcion: ['']
    });
  }

  guardarTemplate(): void {
    if (this.form.valid) {
      const data = this.form.value;
      if (this.editMode) {
        console.log('Actualizando template:', data);
        // lógica de actualización
      } else {
        console.log('Creando nuevo template:', data);
        // lógica de creación
      }
    }
  }
}
