import { RouterLink } from '@angular/router';
import { Iemployee } from '../../interfaces/iemployee';
import { EmployeeService } from './../../services/employee/employee.service';
import { Component, inject, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  employees:Iemployee[]=[]
  private readonly employeeService =inject(EmployeeService)


  ngOnInit(): void {
      this.allemployee()
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
}
