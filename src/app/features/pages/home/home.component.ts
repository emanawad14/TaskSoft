import { RouterLink } from '@angular/router';
import { Iemployee } from '../../interfaces/iemployee';
import { EmployeeService } from './../../services/employee/employee.service';
import { Component, inject, OnInit } from '@angular/core';
import {ReactiveFormsModule , FormGroup, FormBuilder, Validators} from '@angular/forms'


@Component({
  selector: 'app-home',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  


   
   employeeForm!: FormGroup;
  employees:Iemployee[]=[]
  
  isEditMode: boolean = false;
  private readonly employeeService =inject(EmployeeService);
  private readonly eman =inject(FormBuilder);


  ngOnInit(): void {
      this.allemployee();
      this.employeesForms();
      this.UpdateEmployeesForms();
  }


  allemployee()
  {
    this.employeeService.getAllEmployees().subscribe(
      {
        next:(res)=>
        {
          this.employees=res
          console.log(res);
          
        },
        error:(err)=>
        {
          console.log(err);
          

        }
      }
    )

  }


  employeesForms()
  {
    this.employeeForm=this.eman.group({
      empID: [null],
      empName: ['', Validators.required],
    empAddress: ['', Validators.required],
    empPhone: ['', Validators.required],
    empEmail: ['', [Validators.required, Validators.email]]
    })
  }

  UpdateEmployeesForms() {
  this.employeeForm = this.eman.group({
    empID: [null],
    empName: ['', Validators.required],
    empAddress: ['', Validators.required],
    empPhone: ['', Validators.required],
    empEmail: ['', [Validators.required, Validators.email]]
  });
}
//*************** add Employee *************************** */
 addEmployee() {
  if (this.employeeForm.valid) {
    this.employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: (res) => {
        alert('Employee added successfully!');
        console.log('Response:', res);

        const newEmployee = res.employee ? res.employee : res;
         this.allemployee();

      
        this.employees = [...this.employees, newEmployee];

        this.employeeForm.reset();
      },
      error: (err) => {
        console.error('Error while adding:', err);
        alert('Failed to add employee');
      }
    });
  }
}




  
//*************** edit Employee *************************** */

editEmployee() {
  if (this.employeeForm.valid) {
    console.log('Sending to update:', this.employeeForm.value);
    
    this.employeeService.editEmployee(this.employeeForm.value).subscribe({
      next: (res) => {
        alert('Employee Updated Successfully');
        this.allemployee();
        this.employeeForm.reset();
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Update Error:', err);
        alert('Error while updating');
      }
    });
  }
}


PatchValue(note: any) {
  console.log('Editing this employee:', note);

  this.employeeForm.patchValue({
    empID: note.empId, 
    empName: note.empName,
    empAddress: note.empAddress,
    empPhone: note.empPhone,
    empEmail: note.empEmail
  });

  this.isEditMode = true;
}






}
