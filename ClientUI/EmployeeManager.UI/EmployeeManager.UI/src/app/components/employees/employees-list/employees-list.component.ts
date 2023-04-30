import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [
    // {
    //    id: '6410bcf9-168f-42e4-b68b-96add6515f64',
    //    name: 'Srimal Herath',
    //    email: 'srimal@gmail.com',
    //    phone: 947767894560,
    //    salary: 80000,
    //    department: 'JKIT F1'
    // },
    // {
    //   id: '09b49afe-c384-4869-8363-55adddc79705',
    //   name: 'Dilan Harshana',
    //   email: 'dilan@gmail.com',
    //   phone: 947178906543,
    //   salary: 50000,
    //   department: 'JKIT F1'
    // },
    // {
    //   id: '8c414637-59db-400d-b84a-2bd549f4293d',
    //   name: 'Sandamal Weda',
    //   email: 'weda@gmail.com',
    //   phone: 947689006655,
    //   salary: 16000,
    //   department: 'JKIT Intern'
    // }
  ];
  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    //this.employees.push()
    this.employeeService.getAllEmployees()
      .subscribe({
        next: (employees) => {
          console.log(employees);
          this.employees = employees;
        },
        error: (response) => {
          console.log(response);
        }
      })
  }

}
