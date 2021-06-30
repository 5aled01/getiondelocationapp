export class Reservation {
    constructor(public id :number ,public type :string ,public idAnnonce :number ,public idClient :number ,public date:Date ,public etats:String ,public duree:Date){}
}