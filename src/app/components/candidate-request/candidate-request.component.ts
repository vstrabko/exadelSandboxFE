import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-request',
  templateUrl: './candidate-request.component.html',
  styleUrls: ['./candidate-request.component.scss'],
})
export class CandidateRequestComponent implements OnInit {
  registrationForm: FormGroup;

  hoursList: string[] = ['Less than 4 hours', '4-6 hours per day', '6-infinity hours per day'];
  cities: string[] = ['Moscow', 'New York', 'Minsk'];

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  ngOnInit() {
    this.registrationForm = new FormGroup({
      sandbox: new FormControl(),
      firstName: new FormControl("", [Validators.required]),
      secondName: new FormControl("", [Validators.required]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern("[0-9]*")]),
      email: new FormControl("", [Validators.required,Validators.pattern(this.emailRegex)]),
      skype: new FormControl("", [Validators.required]),
      englishLevel: new FormControl("", [Validators.required]),
      motivation: new FormControl("", [Validators.required]),
      availability: new FormControl("", [Validators.required]),
      language: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required]),
      skills: new FormControl("", [Validators.required]),
      job: new FormControl("", [Validators.required]),
      certificates: new FormControl("", [Validators.required]),
      addSkills: new FormControl("", [Validators.required]),
      timeContact: new FormControl("", [Validators.required]),
      joinExadel: new FormControl("", [Validators.required]),
      agreement: new FormControl("", [Validators.required]),
    });

  }

  onSubmit() {
    if(this.registrationForm.valid) {
      console.log(this.registrationForm.value)
      this.registrationForm.reset
    }
  }
}
