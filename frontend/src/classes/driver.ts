import { Member } from './member'

export class Driver {
    self: Member;
    passengers: Member[];
    futurePassengers: Member[];
    showPassengers: boolean = false;
    selectPassengers: boolean = true;
}