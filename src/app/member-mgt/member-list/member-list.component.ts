import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberMgtService } from '../member-mgt.service';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members;
  options: ModalOptions;
  selectedMember;
  inputForm: FormGroup;
  @ViewChild('addUnExchangedModal') addUnExchangedModal: any;
  @ViewChild('exChangingModal') exChangingModal: any;

  constructor(private _memberMgtService: MemberMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.options = {
      backdrop: false
    };

    this._memberMgtService.getMembers().subscribe((members) => {
      this.members = members;
      console.log(this.members);
    });

    this.inputForm = new FormGroup({
      'unExchanged': new FormControl()
    });

  }

  onSelectMember(member) {
    this.selectedMember = member;
  }

  increaseMemberUnExchanged() {

    const increased = this.selectedMember.unExchanged + this.inputForm.value.unExchanged;

    this._memberMgtService.updateMember(this.selectedMember._id, { unExchanged: increased }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error);
      },
      () => {
        console.log('UPDATED');
        this._memberMgtService.getMembers().subscribe((members) => {
          this.members = members;
          this.inputForm.reset();
          this.addUnExchangedModal.hide();
        });
      }
    );

  } // end of increaseMemberUnExchanged()

  exchanging() {

    if (this.inputForm.value.unExchanged % 100 === 0) {

      const increased = this.selectedMember.exchanged + this.inputForm.value.unExchanged;
      const decreased = this.selectedMember.unExchanged - this.inputForm.value.unExchanged;

      this._memberMgtService.updateMember(this.selectedMember._id, { unExchanged: decreased, exchanged: increased }).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          alert(error);
        },
        () => {
          console.log('EXCHANGED');
          this._memberMgtService.getMembers().subscribe((members) => {
            this.members = members;
            this.inputForm.reset();
            this.exChangingModal.hide();
          });
        }
      );
    } else {
      alert('必須是100的倍數');
      this.inputForm.reset();
    }

  } // end of exchanging()

} // end of class
