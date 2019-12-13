export class UserInfoModel {
    guid: string;
    customerUid: string;

    // tslint:disable-next-line:variable-name
    first_name: string;
    // tslint:disable-next-line:variable-name
    last_name: string;

    email: string;
    zipcode: string;

    password: string;

    constructor(obj: any = null) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }
}
