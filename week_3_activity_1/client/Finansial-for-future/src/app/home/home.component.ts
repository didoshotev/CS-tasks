import { AfterViewInit, Component, OnInit } from '@angular/core';
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

	public usersSubscription: Subscription;
	public usersCollection: IUserNew[];
	public usersCollectionSubscription: Subscription;
	
	public agentSubscription: Subscription;
	public agent: Agent

	public sub: Subscription;

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

		this.usersSubscription = this.localUsersService.getUsersCollection().subscribe(data => { 
			// console.log('BS usersCollections', Object.values(data));
			this.usersCollection = Object.values(data);
		})

		// this.usersCollection = this.localUsersService.usersCollectionLocal;
		// console.log(this.localUsersService.usersCollectionLocal);
		
		this.route.data.subscribe((res) => { 
			this.usersCollection = res.usersCollection;
		})
	}

	public handleCreateUserNavigate() {
		this.router.navigateByUrl('/form/new');
	}

	public handleLoginNavigate() { 
		this.router.navigateByUrl('/login');
	}

	public handleLogout() { 
		this.authService.logout();
	}

	public triggerInfo(event: IUserNew): void {
		this.clickedUser = event;
	}

	public handleDeleteUser(value) {
		this.clickedUser = null;
	}

	private handleManagerPanelNavigate() { 
		this.router.navigateByUrl('/manager-panel');
	}

	ngOnDestroy(): void {
		this.agentSubscription.unsubscribe();
		this.usersSubscription.unsubscribe();
		
	}
}
