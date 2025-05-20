import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Iemployee } from '../../interfaces/iemployee';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  detailsEmployee:Iemployee ={} as Iemployee
  private readonly employeeServices=inject(EmployeeService);
  private readonly activatedRoute=inject(ActivatedRoute);
  

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {
        next:(p)=>
        {
          let id=p.get('id');
          const empId = id ? +id : null;
         if (empId !== null) {
    this.employeeServices.getAllByID(empId).subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          this.detailsEmployee=res
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
  }
        }
      }
    )
  }

 
 deleteEmployee(id: number) {
  this.employeeServices.deleteByID(id).subscribe({
    next: (res) => {
      console.log('Employee deleted:', res);
      alert("Employee Delete successfully! ")
      this.employeeServices.getAllEmployees();
    },
    error: (err) => {
      console.error('Delete error:', err);
    }
  });
}

  
}
