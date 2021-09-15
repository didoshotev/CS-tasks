import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserNew } from '../shared/interfaces';
import { LocalUsersService } from '../shared/services/local-users.service';



@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	public clickedUser: IUserNew;

	public usersCollection: IUserNew[];
	public usersCollectionSubscription: Subscription;
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private localUsersService: LocalUsersService,
		) { }

	ngOnInit(): void {
		this.localUsersService.getUsersCollection().subscribe(data => { 
			// console.log('BS usersCollections', data);
		})		

		this.route.data.subscribe((res) => { 
			this.usersCollection = res.usersCollection;
		})
	}

	handleCreateUserNavigate() {
		this.router.navigateByUrl('/form/new');
	}

	triggerInfo(event: IUserNew): void {
		this.clickedUser = event;
	}

	handleDeleteUser(value) {
		this.clickedUser = null;
	}

	ngOnDestroy(): void {
		
	}
}
