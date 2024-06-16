import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent {
  userForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthdate: ['', Validators.required],
      isAdmin: [false, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      console.log('Creating user:', user);
      this.userService
        .createUser(user)
        .pipe(
          catchError((error) => {
            this.errorMessage = error.message;
            console.error('Error creating user:', error);
            return of(null);
          })
        )
        .subscribe(response => {
          if (response) {
            console.log('User created successfully:', response);
          }
        });
    } else {
      console.warn('Form is invalid:', this.userForm.errors);
      this.errorMessage = 'Formulário inválido. Por favor, verifique os campos.';
    }
  }
}
