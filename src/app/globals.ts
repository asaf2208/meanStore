import { Injectable } from "@angular/core";


@Injectable()
export class Globals {
    user = null;

    constructor() {
    };

    setUser(id : string, userName: string, fullName : string, email: string,isAdmin: boolean) {
        this.user = new User(id,userName,fullName,email,isAdmin);
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
    email: string;

    constructor(id : string, userName: string, fullName : string, email: string,isAdmin: boolean) {
        this.id = id;
        this.username = userName;
        this.fullName = fullName;
        this.email = email;
        this.isAdmin = isAdmin;
    }

    getFullName() {
        return this.fullName;
    }


}