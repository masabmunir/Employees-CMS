export class StudentDto{
    readonly name:string;
    readonly email:string;
    readonly password:string;
    readonly address:AddressDto
}

export class AddressDto{
    readonly city:string;
    readonly area:string;
    readonly streetNo:string
}