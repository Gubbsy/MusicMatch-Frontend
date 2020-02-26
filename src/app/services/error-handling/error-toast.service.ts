import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({ providedIn: "root" })
export default class ErrorToastService {

  constructor(private toastController: ToastController) {

  }

  showMultipleToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 30000,
      animated: true,
      showCloseButton: true,
      closeButtonText: "Done",
      color: "danger"
    }).then((mobj) => {
      mobj.present();
    });
  }
}
