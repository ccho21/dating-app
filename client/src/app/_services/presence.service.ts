import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  private newMessageSource = new BehaviorSubject<Message>(null!);
  onlineUsers$ = this.onlineUsersSource.asObservable();
  newMessage$ = this.newMessageSource.asObservable();

  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnline', (username) => {
      this.onlineUsers$.pipe(take(1)).subscribe((usernames) => {
        this.onlineUsersSource.next([...usernames, username]);
      });
    });

    this.hubConnection.on('UserIsOffline', (username) => {
      this.onlineUsers$.pipe(take(1)).subscribe((usernames) => {
        this.onlineUsersSource.next([
          ...usernames.filter((x) => x !== username),
        ]);
      });
    });

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    });

    this.hubConnection.on('NewMessageReceived', (message) => {
      console.log('### messageSent', message);
      const { senderUsername, content, recipientPhotoUrl } = message;
      let snackBarRef = this._snackBar.open(
        `${senderUsername} has sent you a new message!`,
        'Check',
        {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        }
      );

      this.newMessageSource.next(message);

      snackBarRef
        .onAction()
        .subscribe(() =>
          this.router.navigateByUrl('/messages/' + senderUsername)
        );
    });
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch((error) => console.log(error));
  }
}
