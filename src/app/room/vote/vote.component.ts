import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  users: any;
  roomName: string;
  userName: string;
  hasVotingStarted = false;
  showResults = false;
  votingCompleted = false;
  selectedCard: number;
  selectedCardIndex: number;
  cardNumbers = [1,2,3,5,8,13,20,40,100];
  constructor(private route: ActivatedRoute, private router: Router, private websocket: WebSocketService) {}

  ngOnInit() {
    this.roomName = this.route.snapshot.params.roomid;
    this.userName = this.route.snapshot.params.userid;
    if (this.websocket.socket.disconnected) {
      this.router.navigate(['/room']);
    }
    this.websocket.newUserJoined().subscribe((data: any) => {
      this.users = data.users;
    });

    this.websocket.hasVotingStarted().subscribe((data: any) => {
      this.hasVotingStarted = true;
      this.votingCompleted = false;
      this.showResults = false;
      this.hasVotingStarted = true;
      this.selectedCardIndex = null;
      this.users = data.users;
    });

    this.websocket.cardSelected().subscribe((data: any) => {
      this.users = data.users;
    });

    this.websocket.votingCompleted().subscribe((data: any) => {
      this.votingCompleted = true;
      this.showResults = true;
      this.users = data.users;
    });

    this.websocket.userDisconnected().subscribe((data: any) => {
      this.users = data.users;
    });
  }

  startVoting() {
    this.websocket.emit('start voting', this.roomName);
  }

  stopVoting() {
    if (this.selectedCard) {
      this.websocket.emit('select card', {
        room: this.roomName,
        card: this.selectedCard,
        username: this.userName
      });
      this.showResults = true;
    }
  }

  forceStopVoting() {
    this.websocket.emit('stop voting', this.roomName);
  }

  select(index: number) {
    this.selectedCardIndex = index;
    this.selectedCard = this.cardNumbers[this.selectedCardIndex];
  }

  getAvgScore() {
    const totalUsers = this.users.length;
    const total = this.users.reduce((acc, cur) => {
      return acc + cur.points;
    }, 0);
    const avg = Math.ceil(total/totalUsers);

    return total/ totalUsers;
  }

}
