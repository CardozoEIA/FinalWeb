import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from 'src/app/models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private api_url = 'http://localhost:3000/api/template';

  constructor(private http: HttpClient) {}

  addTemplate(template: Template): Observable<any> {
    const endpoint = `${this.api_url}/add`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    return this.http.post(endpoint, template, { headers });
  }

  getTemplates(): Observable<Template[]> {
    const endpoint = this.api_url;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    return this.http.get<Template[]>(endpoint, { headers });
  }

  changeTemplate(id: string, state: boolean) {
    const endpoint = `${this.api_url}/changerStatus/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    const body = { isActive: state };
    return this.http.post<Template[]>(endpoint, body, { headers });
  }

  getTemplateById(id: string) {
    const endpoint = `${this.api_url}/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    return this.http.get<Template>(endpoint, { headers });
  }

  updateTemplate(id: string, templateData: Template) {
    const endpoint = `${this.api_url}/update/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    return this.http.post<Template>(endpoint, templateData, { headers });
  }

  deleteTemplate(id: string) {
    const endpoint = `${this.api_url}/delete/${id}`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    return this.http.delete<Template>(endpoint, { headers });
  }
}
