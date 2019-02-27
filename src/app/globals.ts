import { Injectable } from "@angular/core";


@Injectable()
export class Globals {
    user = null;

    constructor() {
    };

    setUser(id : string, userName: string, fullName : string, isAdmin: boolean) {
        this.user = new User(id,userName,fullName,isAdmin);
    }

    getUser() {
        return this.user;
    }
}

class User {
    id: string;
    username: string;
    fullName: string;
    isAdmin: boolean;

    constructor(id : string, userName: string, fullName : string, isAdmin: boolean) {
        this.id = id;
        this.username = userName;
        this.fullName = fullName;
        this.isAdmin = isAdmin;
    }

    getFullName() {
        return this.fullName;
    }


}