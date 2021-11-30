import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  constructor(private http: HttpClient) {}
  public fileSendForm: FormGroup;
  /* public email: string = 'test@test.test'; */

  ngOnInit(): void {
    this.fileSendForm = new FormGroup({
      email: new FormControl('test@test.test', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
    });
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files !== null) {
      if (target.files.length > 0) {
        const file = target.files[0];
        this.fileSendForm.patchValue({
          fileSource: file,
        });
      }
    }
  }
  submit(): void {
    if (this.fileSendForm.valid) {
      const formData = new FormData();
      const candidateEmail: string = this.fileSendForm.controls.email.value || '';
      formData.append('file', this.fileSendForm.controls.fileSource.value, `${candidateEmail}`);
      this.http.post('http://64.227.114.210:9090/api/files', formData).subscribe();
    }
  }
}
