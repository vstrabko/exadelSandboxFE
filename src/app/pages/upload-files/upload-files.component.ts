import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { REGEXP } from 'src/app/shared/constants/validators';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService,
  ) {
    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }
  private title: string = '';
  private text: string = '';
  private titleEr: string = '';
  private textEr: string = '';

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
            this.toastr.showError(this.titleEr, this.textEr);
          },
        );
      }
    }
  }
  submit(): void {
    this.fileSendForm.controls.token.setValue(this.token);
    if (this.fileSendForm.valid) {
      this.http
        .post(`http://64.227.114.210:9090/api/testresults`, this.fileSendForm.value)
        .subscribe(
          () => this.toastr.showSuccess(this.title, this.text),
          () => this.toastr.showError(this.titleEr, this.textEr),
        );
    }
  }
  translateLabels(): void {
    this.title = this.translateService.instant('tostr.title');
    this.text = this.translateService.instant('tostr.text');
    this.titleEr = this.translateService.instant('tostr.titleEr');
    this.textEr = this.translateService.instant('tostr.textEr');
  }
}
