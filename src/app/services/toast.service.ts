import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title: string, text: string) {
    this.toastr.success(title, text);
  }
  showError(title: string, text: string) {
    this.toastr.error(title, text);
  }
  showInfo(title: string, text: string) {
    this.toastr.info(title, text);
  }
  showWarning(title: string, text: string) {
    this.toastr.warning(title, text);
  }
}

//https://www.npmjs.com/package/ngx-toastr link with description