import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IUserNew } from '../shared/interfaces';
import { Agent } from '../shared/models/agent.model';
import { AuthService } from '../shared/services/auth.service';
import { LocalUsersService } from '../shared/services/local-users.service';



@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {

	public clickedUser: IUserNew;

	public usersSubscription: Subscription;
	public usersCollection: IUserNew[];
	public usersCollectionSubscription: Subscription;

	public usersObs: Observable<{ users: IUserNew[] }>;

	public agentSubscription: Subscription;
	public agent: Agent

	public sub: Subscription;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private localUsersService: LocalUsersService,
		private authService: AuthService,
		private store: Store<{ usersCollection: { users: IUserNew[] } }>,
	) { }

	ngOnInit(): void {
		
		// store
		this.usersObs = this.store.select('usersCollection');

		this.agentSubscription = this.authService.agent.subscribe(agent => {
			this.agent = agent;
		});

		this.usersSubscription = this.localUsersService.getUsersCollection().subscribe(data => {
			this.usersCollection = Object.values(data);
		});

		this.route.data.subscribe((res) => {
			this.usersCollection = res.usersCollection;
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
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
