import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { REGEXP } from 'src/app/shared/constants/validators';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private toastr: ToastService,
  ) {}
  public fileSendForm: FormGroup;
  public showImg: boolean = false;
  private token: string = this.activateRoute.snapshot.params['token'];

  ngOnInit(): void {
    this.fileSendForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(REGEXP.email)]),
      fileId: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
    });
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files !== null) {
      if (target.files.length > 0) {
        const file = target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        this.http.post('http://64.227.114.210:9090/api/files', formData).subscribe(
          (responseFileID: any) => {
            // Change any type to interface when back done
            this.fileSendForm.controls.fileId.setValue(responseFileID);
            this.showImg = true;
          },
          () => {
            this.showImg = false;
            this.toastr.showError('Refresh page and try again', 'File not uploaded');
          },
        );
      }
    }
  }
  submit(): void {
    this.fileSendForm.controls.token.setValue(this.token);
    if (this.fileSendForm.valid) {
      this.http
        .post(`http://64.227.114.210:9090/api/files/token`, this.fileSendForm.value)
        .subscribe(
          () => this.toastr.showSuccess('Upload', 'Succesful'),
          () => this.toastr.showError('Error', 'File not uploaded'),
        );
    }
  }
}
