import { RouterLink } from '@angular/router';
import { Iemployee } from '../../interfaces/iemployee';
import { EmployeeService } from './../../services/employee/employee.service';
import { Component, inject, OnInit } from '@angular/core';
import {ReactiveFormsModule , FormGroup, FormBuilder, Validators} from '@angular/forms'
import { error } from 'console';

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
      this.employeesForms()
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

//*************** add Employee *************************** */
  addEmployee()
  {
    if(this.employeeForm.valid)
    {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        {
          next:(res)=>
          {
            alert('Employee added successfully!');
            console.log(res.employee);
            

              this.employeeForm.reset();
               this.employeeService.getAllEmployees(); 
          }
        },

      
        

       
        

        
      )
    }
  }
  
//*************** edit Employee *************************** */

editEmployee()
{
  if(this.employeeForm.valid)
  {
    this.employeeService.editEmployee(this.employeeForm.value).subscribe(
      {
        next:(res)=>
        {
          console.log(res.employee);
          alert('Employee Updated');
          this.isEditMode = false;
          this.employeeForm.reset();
           this.employeeService.getAllEmployees();

        }
        ,
         error: (err) => {
        console.error('Edit Error:', err);
        alert('Edit failed');
      }
      }

    )
  }
}






setFormForEdit(emp: any) {
  this.employeeForm.patchValue({
    empID: emp.empID,
    empName: emp.empName,
    empAddress: emp.empAddress,
    empPhone: emp.empPhone,
    empEmail: emp.empEmail
  });
  this.isEditMode = true;
}

}
