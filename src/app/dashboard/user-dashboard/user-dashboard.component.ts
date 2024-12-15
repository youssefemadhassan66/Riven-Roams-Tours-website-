import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TourSchema } from '../../schema/tourSchema';
import { UserServiceService } from '../../user/user-serv/user-service.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  constructor(private router: Router, private User: UserServiceService) {}
  users: any[] = [];

  DeleteConfirmation = false;
  index = 0;
  side_dashBoard = [{ name: 'Create A Tour', value: 'createUser' }];
  ngOnInit(): void {
    this.User.GetUsers().subscribe((response) => {
      this.users = response.data;
      console.log(response);
    });
  }
  navigateSideBar(element: string) {
    console.log(element);
    this.router.navigate([`/${element}`]);
  }
  findBYindex(indexToFind: number) {
    const user = this.users.find((element, index) => {
      return index === indexToFind;
    });
    return user;
  }

  navigateViewModel(indexToFind: number) {
    const user = this.findBYindex(indexToFind);
    this.router.navigate(['/tours', user?.id]);
  }

  navigateEditModel(indexToFind: number) {
    const user = this.findBYindex(indexToFind);
    this.router.navigate(['/tourEdit', user?.id]);
  }

  onDeleteClick(indexToFind: number) {
    this.DeleteConfirmation = true;
    this.index = indexToFind;
    console.log(this.index);
  }

  cancelDelete() {
    this.DeleteConfirmation = false;
  }

  confirmDelete() {
    console.log(this.index);
    const user = this.findBYindex(this.index);
    this.User.deleteUser(user?.id).subscribe((response) => {
      console.log(response);
    });
    this.DeleteConfirmation = false;
  }
}
