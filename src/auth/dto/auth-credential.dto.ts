import { Matches } from "class-validator";
import { IsNotEmpty, IsString } from "class-validator"; ///types/decorator/decorators

export class AuthCredentialsDto{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsString()
    id:string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    pw:string;

    @IsString()
    admissionDate:string;
}