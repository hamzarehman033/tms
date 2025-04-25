import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { modalObj } from '../../../core/types';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ModalComponent implements OnInit, OnChanges {
  selectedId: any;
  modal_type: any;

  @Input() modal_fields: modalObj[] = [];
  @Input() modal_info: any;

  @Output() addModalDetails = new EventEmitter<any>();
  @Output() updateModalDetails = new EventEmitter<any>();
  @Output() yesClicked = new EventEmitter<any>();

  @ViewChild('exampleModal', { static: true }) modalElement!: ElementRef;
  @ViewChild('deleteModal', { static: true }) deleteModalElement!: ElementRef;

  private modal: any;
  private deleteModal: any;
  parameter: any;
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({});

    for (let field of this.modal_fields) {
      this.form.addControl(
        field.key,
        this.fb.control(field.value)
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modal_fields']) {
      this.buildFormFromModalFields();
    }
  }

  private buildFormFromModalFields() {
    this.form = this.fb.group({});

    for (let field of this.modal_fields) {
      const controlValidators = field.validators ?? [];

      this.form.addControl(
        field.key,
        this.fb.control(field.value || '', controlValidators)
      );
    }
  }

  // Add modal details
  addDetails() {
    if (this.form.valid) {
      this.addModalDetails.emit(this.form.value);
      this.close();
    } else {
      this.form.markAllAsTouched(); // shows errors
    }
  }

  updateDetails() {
    if (this.form.valid) {
      this.updateModalDetails.emit(this.form.value);
      this.close();
    } else {
      this.form.markAllAsTouched(); // shows errors
    }
  }

  onFieldChange(event: any) {
    const isRestricted = event.target.value == 0;

    const restrictionField = this.modal_fields.find(field => field.key === 'restriction_reason');
    if (restrictionField) {
      restrictionField.hidden = !isRestricted;
    }
  }

  open(data?: any, mode?: string) {
    this.modal_type = mode === 'add' ? 'add' : 'update';

    if (mode === 'update' && data) {
      data = data.data;
      for (let field of this.modal_fields) {
        if (!field.hidden) {
          const key = field.key;
          const value = data[key] ?? data.user?.[key] ?? '';
          this.form.get(key)?.setValue(value);
        }
        else {
          const key = field.key;
          const value = data[key] ?? data.user?.[key] ?? '';
          this.form.get(key)?.setValue(value);
        }
      }
    }
    if (!this.modal) {
      this.modal = new bootstrap.Modal(this.modalElement?.nativeElement);
    }
    this.modal.show();
  }

  close() {
    if (this.modal) {
      this.modal.hide();
    }
    this.reset();
  }

  // Delete details
  deleteDetails() {
    this.yesClicked.emit();
  }

  openDelete(id: any, param: any) {
    this.parameter = param;
    this.selectedId = id;
    if (this.selectedId) {
      this.deleteModal = new bootstrap.Modal(this.deleteModalElement?.nativeElement);
    }
    this.deleteModal.show();
  }

  closeDelete() {
    if (this.deleteModal) {
      this.deleteModal.hide();
    }
  }

  reset() {
    for (let field of this.modal_fields) {
      field.value = ''; // Reset the field object

      if (this.form.contains(field.key)) {
        this.form.get(field.key)?.setValue(''); // Reset the form control
        this.form.get(field.key)?.markAsPristine(); // Optional: reset touch state
        this.form.get(field.key)?.markAsUntouched();
      }
    }
  }
}
