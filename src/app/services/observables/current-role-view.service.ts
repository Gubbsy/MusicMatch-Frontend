import { Injectable } from "@angular/core";
import { Roles } from "src/app/utils/roles.enum.event";
import { Subject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })

export class CurrentRoleViewService {
  private subject = new Subject<Roles>();
  private currentRoleView: Roles;

  constructor() {
    this.setRoleView(Roles.ARTIST);
  }

  setRoleView(role: Roles) {
    this.currentRoleView = role;
    this.subject.next(role);
  }

  getSubject(): Observable<Roles> {
    return this.subject.asObservable();
  }

  getCurrentRoleView() {
    return this.currentRoleView;
  }
}
