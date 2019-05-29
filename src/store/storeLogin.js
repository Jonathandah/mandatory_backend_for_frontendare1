import { BehaviorSubject } from "rxjs";

export const login$ = new BehaviorSubject(
  window.localStorage.getItem("login") || null
);

export function updateLogin(newLogin) {
  if (!newLogin) {
    window.localStorage.removeItem("login");
  } else {
    window.localStorage.setItem("login", newLogin);
  }

  login$.next(newLogin);
}
