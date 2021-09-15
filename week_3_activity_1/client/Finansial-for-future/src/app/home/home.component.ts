import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserNew } from '../shared/interfaces';
import { Agent } from '../shared/models/agent.model';
import { AuthService } from '../shared/services/auth.service';
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
	
	public agentSubscription: Subscription;
	public agent: Agent

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private localUsersService: LocalUsersService,
		private authService: AuthService,
		) { }

	ngOnInit(): void {

		this.agentSubscription = this.authService.agent.subscribe(agent => { 
			this.agent = agent;
		})

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

	handleLoginNavigate() { 
		this.router.navigateByUrl('/login');
	}

	handleLogout() { 
		this.authService.logout();
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
