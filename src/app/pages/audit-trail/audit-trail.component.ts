import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { filterObj, Pagination } from '../../core/types';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrl: './audit-trail.component.scss',
  standalone: true,
  imports: [TableComponent, FiltersComponent, PaginatorComponent]
})
export class AuditTrailComponent implements OnInit {
  columnsToDisplay = ['audit_id', 'module_name', 'audit_type', 'audit_activity', 'createdAt', 'audit_email', 'ip_address', 'audit_action'];
  dataSource: any = [];

  auditFilter: any = {};

  fields: filterObj[] = [
    { type: 'text', key: 'id', placeholder: 'Enter ID', value: '' },
    { type: 'text', key: 'module_name', placeholder: 'Name', value: '' },
    {
      type: 'dropdown', key: 'type', placeholder: 'Audit Type', value: '', options: [
        { label: 'Logout', value: 'logout' },
        { label: 'Login', value: 'login' },
        { label: 'User', value: 'user' },
        { label: 'Create User', value: 'create_users' },
        { label: 'Update User', value: 'update_user' },
        { label: 'Delete User', value: 'delete_user' },
        { label: 'Add Driver', value: 'add_driver' }
      ]
    },
    {
      type: 'dropdown', key: 'activity', placeholder: 'Activity', value: '', options: [
        { label: 'Logged In', value: 'Logged in' },
        { label: 'Logged Out', value: 'Logged out' },
        { label: 'Inserted', value: 'Inserted' },
        { label: 'Deleted', value: 'Deleted' },
        { label: 'Updated', value: 'Updated' }
      ]
    },
    { type: 'text', key: 'user_email', placeholder: 'Email', value: '' },
    {
      type: 'dropdown', key: 'action', placeholder: 'Action', value: '', options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
      ]
    },
    { type: 'text', key: 'user_ip', placeholder: 'Enter Date', value: '' },
    { type: 'text', key: 'start_date', placeholder: 'Enter Date', value: '' },
    { type: 'text', key: 'end_date', placeholder: 'Enter Date', value: '' },

  ];

  // Pagination
  pagination: Pagination = {
    current_page: 1,
    per_page: 10,
    total_pages: [],
    total_records: 10,
  }
  pageCount: number = 10;
  constructor(private appSerivce: AppService) { }

  ngOnInit(): void {
    this.getAllAuditTrail();
  }

  getAllAuditTrail() {
    const payload: any = {
      limit: this.pagination.per_page,
      page: this.pagination.current_page
    };

    this.fields.forEach((field: any) => {
      if (field.value) this.auditFilter[field.key] = field.value;
    })

    if (this.auditFilter.id) payload["id"] = [Number(this.auditFilter.id)];
    if (this.auditFilter.module_name) payload["module_name"] = this.auditFilter.module_name;
    if (this.auditFilter.type) payload["type"] = this.auditFilter.type;
    if (this.auditFilter.activity) payload["activity"] = this.auditFilter.activity;
    if (this.auditFilter.user_email) payload["user_email"] = this.auditFilter.user_email;
    if (this.auditFilter.action) payload["action"] = this.auditFilter.action;
    if (this.auditFilter.user_ip) payload["user_ip"] = this.auditFilter.user_ip;
    if (this.auditFilter.start_date) payload["start_date"] = this.auditFilter.start_date;
    if (this.auditFilter.end_date) payload["end_date"] = this.auditFilter.end_date;

    this.appSerivce.getAllAuditTrail(payload).subscribe((data: any) => {
      console.log("Audit Trail data: ", data);

      this.dataSource = data?.data?.rows;
      this.pagination.total_records = data.data.count;
      let pagesCount = Math.ceil(this.pagination.total_records / this.pagination.per_page);
      this.pagination.total_pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    })
  }

  reset() {
    this.fields.forEach(field => {
      field.value = '';
    });

    this.auditFilter.id = '';
    this.auditFilter.module_name = '';
    this.auditFilter.type = '';
    this.auditFilter.user_email = '';
    this.auditFilter.user_ip = '';
    this.auditFilter.activity = '';
    this.auditFilter.createdAt = '';

    this.pagination.current_page = 1;
    this.pagination.per_page = 10;
    this.pageCount = 10;
    this.getAllAuditTrail();
  }
  goToPage(page: number): void {
    this.pagination.current_page = page;
    this.getAllAuditTrail();
  }

  selectedPage(pages_Selected: number) {
    this.pagination.per_page = pages_Selected;
    this.pagination.current_page = 1;
    this.getAllAuditTrail();
  }
}
