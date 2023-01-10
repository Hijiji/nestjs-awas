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
    @Matches(/^[a-zA-Z0-9]*$/, { //영어랑 숫자만 입력가능 유효성 체크
        message: 'password only accepts english and number'
    })
    pw:string;

    @IsString()
    admissionDate:string;
}