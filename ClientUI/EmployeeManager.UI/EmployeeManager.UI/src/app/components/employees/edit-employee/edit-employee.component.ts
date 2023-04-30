import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { faUser, faEyeSlash, faEnvelope, faPhone, faDollar, faBuilding, faIdCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  faIdCard = faIdCard;
  faUser = faUser;
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

  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    salary: 0,
    department: ''
  };

  constructor(private route: ActivatedRoute, private employeeService: EmployeesService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          //call api
          this.employeeService.getEmployee(id)
            .subscribe({
              next: (response) => {
                this.employeeDetails = response;
                console.log(this.employeeDetails.name);
                this.registrationFormGroup.setValue({
                  id: this.employeeDetails.id,
                  name: this.employeeDetails.name,
                  email: this.employeeDetails.email,
                  password: this.employeeDetails.password,
                  phone: this.employeeDetails.phone,
                  salary: this.employeeDetails.salary,
                  department: this.employeeDetails.department
                });

              }
            })
        }
      }
    })
  }

  updateEmployee() {
    this.formSubmitted = true;
    if (this.registrationFormGroup.valid) {
      console.log("Form Submitted");

      this.employeeDetails.name = this.registrationFormGroup.get('name')?.value!;
      this.employeeDetails.phone = this.registrationFormGroup.get('phone')?.value!;
      this.employeeDetails.email = this.registrationFormGroup.get('email')?.value!;
      this.employeeDetails.password = this.registrationFormGroup.get('password')?.value!;
      this.employeeDetails.salary = this.registrationFormGroup.get('salary')?.value!;
      this.employeeDetails.department = this.registrationFormGroup.get('department')?.value!;


      this.employeeService.updateEmployee(this.employeeDetails.id, this.employeeDetails)
        .subscribe({
          next: (response) => {
            this.updateToaster();
            this.router.navigate(['employees']);
          }
        })
    }
  }

  updateToaster() {
    this.toastr.show('Data Update Successfully !', '', {
      closeButton: true
    });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: (response) => {
          this.deleteToaster();
          this.router.navigate(['employees']);
        }
      })
  }

  deleteToaster() {
    this.toastr.warning('Data Delete Successfully !', '', {
      closeButton: true
    });
  }

}
