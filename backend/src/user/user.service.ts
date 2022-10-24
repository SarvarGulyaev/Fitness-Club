import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';
import {User} from "./models/user.model";
import {ConfigService} from "@nestjs/config";
import {RegisterUserDto} from "./dtos/register-user.dto";
import {MailerService} from "@nestjs-modules/mailer";
import {LoginUserDto} from "./dtos/login-user.dto";
import * as bcrypt from 'bcrypt';
import * as randomstring from "randomstring";
import {ITokens} from "./types/jwt.type";
import {JwtService} from "@nestjs/jwt";
import {VerifyLinkDto} from "./dtos/verify-link.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        private jwtService: JwtService,
) {}

    async register(registerUserDTO: RegisterUserDto) {
        const {email, password} = registerUserDTO

        const user = await this.userModel.findOne({ email })

        if(user) {
            throw new BadRequestException('Пользователь с такой почтой уже существует.')
        }

        const hashedPassword = await bcrypt.hash(password, Number(this.configService.get<any>('HASH_SALT')))
        const verifyLink = randomstring.generate(7);

        const newUser = await this.userModel.create({
            email,
            password: hashedPassword,
            verifyLink
        })

        await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: '[GulyaevGYM] Подтверждение аккаунта',
            text: '',
            html:
                `
                    <div>
                        <h1>Код подтверждения для регистрации в личном кабинете</h1>
                        <h3>${verifyLink}</h3>
                    </div>
                `
        })

        const tokens = await this.getTokens(newUser._id, newUser.email, newUser.isVerify)

        return {
            message: 'Сообщение для активации вашего личного кабинета было отправлено на вашу почту',
            user: newUser,
            ...tokens
        }
    }

    async verify(verifyLinkDTO: VerifyLinkDto) {
        const {verifyLink} = verifyLinkDTO
        const isVerifyUser = await this.userModel.findOne({ verifyLink })

        if(!isVerifyUser) throw new BadRequestException('Неверный код активации')

        isVerifyUser.isVerify = true
        await isVerifyUser.save()

        return {
            message: 'Успешная активация!',
            user: isVerifyUser
        }
    }

    async login(loginUserDTO: LoginUserDto) {
        const {email, password} = loginUserDTO

        const user = await this.userModel.findOne({email})

        if(!user) {
            throw new BadRequestException('Неверный логин')
        }

        const comparedPassword = await bcrypt.compare(password, user.password)

        if(!comparedPassword) {
            throw new BadRequestException('Неверный пароль')
        }

        if(!user.isVerify) {
            return {
                message: 'Пожалуйста, подтвердите вашу почту.'
            }
        } else {
            const tokens = await this.getTokens(user._id, user.email, user.isVerify)

            return {user, ...tokens}
        }

    }

    async getTokens(userID, email, isVerify): Promise<ITokens> {
        const jwtPayload = {
            userID,
            email,
            isVerify
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>('ACCESS_SECRET'),
                expiresIn: '20s'
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>('REFRESH_SECRET'),
                expiresIn: '7d'
            })
        ])

        return {
            accessToken,
            refreshToken
        }
    }

    async test() {

    }
}
