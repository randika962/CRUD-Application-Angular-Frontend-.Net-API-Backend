import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faEyeSlash, faEye, faEnvelope, faPhone, faDollar, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  faUser = faUser;
  faEye = faEye
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faDollar = faDollar;
  faBuilding = faBuilding;

  formSubmitted = false;
  registrationFormGroup = new FormGroup({
    id: new FormControl(''),
    email: new FormControl('', [Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
    password: new FormControl('', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    name: new FormControl(''),
    phone: new FormControl('', [Validators.pattern('[0-9]{10}')]),
    salary: new FormControl(0),
    department: new FormControl(''),
  });

  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    salary: 0,
    department: ''
  };
  constructor(private employeeService: EmployeesService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addEmployee() {
    this.formSubmitted = true;
    if (this.registrationFormGroup.valid) {
      console.log("Form Submitted");

      this.addEmployeeRequest.name = this.registrationFormGroup.get('name')?.value!;
      this.addEmployeeRequest.phone = this.registrationFormGroup.get('phone')?.value!;
      this.addEmployeeRequest.email = this.registrationFormGroup.get('email')?.value!;
      this.addEmployeeRequest.password = this.registrationFormGroup.get('password')?.value!;
      this.addEmployeeRequest.salary = this.registrationFormGroup.get('salary')?.value!;
      this.addEmployeeRequest.department = this.registrationFormGroup.get('department')?.value!;

      console.log(this.addEmployeeRequest);
      this.employeeService.addEmployee(this.addEmployeeRequest)
        .subscribe({
          next: (employee) => {
            console.log(employee);
            this.showToaster();
            this.router.navigate(['employees']);
          },
        });
    }
  }

  showToaster() {
    // this.toastr.success("Data Enter Successfully !")
    this.toastr.success('Data Enter Successfully !', '', {
      closeButton: true
    });
  }


}
