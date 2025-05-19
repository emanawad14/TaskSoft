import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }


  //*************     getAllEmployee ************************* */
  getAllEmployees():Observable<any>
  {
    return this.http.get('http://task.soft-zone.net/api/Employees/getAllEmployees');

  }


  //*************     getAllEmployeeBy ID ************************* */

  getAllByID(id:number | null):Observable<any>
  {
    return this.http.get(`http://task.soft-zone.net/api/Employees/getEmpByID/${id}`)
  }

  //***********************  DeleteBy Id ****************************** */

  deleteByID(id:number):Observable<any>
  {
    return this.http.get(`http://task.soft-zone.net/api/Employees/deleteEmpByID/${id}`)
  }
}
