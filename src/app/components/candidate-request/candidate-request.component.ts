import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate-request',
  templateUrl: './candidate-request.component.html',
  styleUrls: ['./candidate-request.component.scss'],
})
export class CandidateRequestComponent implements OnInit {
  constructor(private toastr: ToastrService){}
  registrationForm: FormGroup;

  cities: string[] = ['Moscow', 'New York', 'Minsk'];

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      sandbox: new FormControl(),
      firstName: new FormControl('', [Validators.required]),
      secondName: new FormControl('', [Validators.required]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
      skype: new FormControl('', [Validators.required]),
      englishLevel: new FormControl('', [Validators.required]),
      motivation: new FormControl('', [Validators.required]),
      availability: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required]),
      certificates: new FormControl(''),
      addSkills: new FormControl(''),
      timeContact: new FormControl('', [Validators.required]),
      joinExadel: new FormControl(''),
      agreement: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.toastr.success('Вы успешно отправили форму', 'Принято')
      this.registrationForm.reset();
    }
  }
}
