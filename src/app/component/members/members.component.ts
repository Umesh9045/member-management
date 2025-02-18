import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Member } from '../../Model/member';
import { MembersService } from '../../Services/members.service';


@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})

export class MembersComponent implements OnInit {
  memberForm: FormGroup = new FormGroup({});
  memberList: Member[] = [];
  memberService = inject(MembersService);
  memberFormValues: any;
  modal: any;

  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.setFormState();
    this.getAllMembers();
  }

  openModal() {
    const memberModal = document.getElementById('myModal');
    if (memberModal) {
      const modal = new (window as any).bootstrap.Modal(memberModal);
      this.modal = modal;
      modal.show();
    }
  }

  closeModal() {
    this.modal.hide();
  }

  setFormState() {
    this.memberForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.memberForm.invalid) {
      // console.log(this.memberForm.value);
      alert('please fill all fields');
      return;
    } else {
      this.memberFormValues = this.memberForm.value;

      if (this.memberFormValues.id == 0) {

        this.memberService.addNewMember(this.memberFormValues).subscribe(() => {
          // next: (res) => console.log('Success:', res),
          // error: (err) => console.error('Error:', err.error) 
          alert('Member added sucessfull');
          this.getAllMembers();
          this.memberForm.reset();
          this.closeModal();
        })
      }
      else {
        this.memberService.updateMember(this.memberFormValues).subscribe(() => {
          // next: (res) => console.log('Success:', res),
          // error: (err) => console.error('Error:', err.error) 
          alert('Member added sucessfull');
          this.getAllMembers();
          this.memberForm.reset();
          this.closeModal();
        })
      }
    }
  }

  getAllMembers() {
    this.memberService.getAllMembers().subscribe((result) => {
      this.memberList = result;
    })
  }

  onDelete(id: number) {
    this.memberService.deleteMember(id).subscribe(() => {
      alert('Member deleted sucessfull');
      this.getAllMembers();
    })
  }

  // onEdit(item: Member) {
  //   this.openModal();
  //   this.memberForm.patchValue(item);
  // }

  onEdit(item: Member) {
    this.openModal();

    // Ensure date is in 'YYYY-MM-DD' format for the input field
    let formattedDate = item.dob ? new Date(item.dob).toISOString().split('T')[0] : '';

    this.memberForm.patchValue({
      ...item,
      dob: formattedDate // Set formatted date
    });
  }

}

