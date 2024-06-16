import { Component, OnInit, Pipe } from '@angular/core';
import { UserService } from './user.service';
import { CommonModule, NgFor } from '@angular/common';
import { User } from './user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = new User();
  user: User = new User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  updateUser(): void {
    this.userService.updateUser(this.selectedUser).subscribe(() => {
      this.fetchUsers();
      this.closeModal();
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(() => {
      this.fetchUsers();
    });
  }

  private fetchUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  openModal(user: User): void {
    this.selectedUser = { ...user };
    (document.getElementById('myModal') as HTMLDialogElement).showModal();
  }

  closeModal(): void {
    (document.getElementById('myModal') as HTMLDialogElement).close();
  }
}
