import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserNew } from '../shared/interfaces';
import GlobalRefence from '../Globals';
import { UsersDataService } from '../shared/services/users-data.service';

@Component({
  selector: 'app-manager-panel-page',
  templateUrl: './manager-panel-page.component.html',
  styleUrls: ['./manager-panel-page.component.scss']
})

export class ManagerPanelPageComponent implements OnInit {

  public usersCollection:    IUserNew[];
  
  public riskyCollection:    IUserNew[] = [];
  public standartCollection: IUserNew[] = [];
  public vipCollection:      IUserNew[] = [];

  public isDialogActive: boolean = false;
  public dialogInfo;

  constructor(
    private route: ActivatedRoute,
    private usersDataService: UsersDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
    this.route.data.subscribe((res) => { 
			this.usersCollection = res.usersCollection;
      this.splitCollections(this.usersCollection);
		})
  }

  public drop(event: CdkDragDrop<string[]>) {
    
    if (event.previousContainer === event.container) {      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const newType = event.container.element.nativeElement.dataset['collection'];
      const userId = event.item.element.nativeElement.dataset['userid'];

      this.usersDataService.changeUserType(newType, userId);

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  public hanldePopupOpen(item) { 
    this.isDialogActive = true;
    this.dialogInfo = item;
  }

  public splitCollections(usersCollection: IUserNew[]) { 
    
    const userTypes = { 
      'risky': (user) => this.riskyCollection.push(user),
      'standart': (user) => this.standartCollection.push(user),
      'vip': (user) => this.vipCollection.push(user),
    }

    usersCollection.map(user => userTypes[user.type](user))
  }

  public handleFormNavigate(type: string) {
    this.router.navigateByUrl('/form/new');
  }
}
