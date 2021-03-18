import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  pokerForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private websocket: WebSocketService
  ) {}

  ngOnInit() {
    this.initializePokerForm();
  }

  /**
	 * Initializes poker form.
	 */
	private initializePokerForm(): void {
    this.pokerForm = this.formBuilder.group({
			username: [
				'',
				[Validators.required, Validators.minLength(2)]
			],
			room: ['', Validators.required]
		});
	}

  joinRoom(): void {
    const {status, value} = this.pokerForm;
    if (status === 'VALID') {
      this.websocket.joinRoom(value);
      this.router.navigate([value.room, 'vote', value.username], { relativeTo: this.route });
    }
  }
}
