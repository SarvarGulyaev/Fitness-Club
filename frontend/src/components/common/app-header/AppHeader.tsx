import React from 'react';
import {Button, Input} from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCall } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import {AppHeaderTemplate, CallNumber, InputBlock, LogIn, Logo, LowerSection, LowerHeader, NumberPhone, UpperHeader } from './styles/app-header.style';
import {SearchIcon} from "@chakra-ui/icons";
import gymLogo from '../../../../public/gym-logo.svg'
import Image from 'next/image'
import {useRouter} from "next/router";

const AppHeader = () => {
    const router = useRouter()

    const arraySectionName = ['Виды карт', 'Наши тренера', 'Блог', 'О нас', 'Контакты']

    const redirectHandler = () => router.push('/')

    return (
        <AppHeaderTemplate>
            <UpperHeader>
                <Logo
                    onClick={redirectHandler}
                >
                    <Image src={gymLogo} width={200} height={100}/>
                </Logo>
                <InputBlock>
                    <Input placeholder='Поиск по сайту' />
                    <SearchIcon><BsSearch size={20} /></SearchIcon>
                </InputBlock>
                <CallNumber>
                    <div>
                        <IoIosCall />
                        <NumberPhone href="tel:+74951234567">+7 (978) 876-83-25</NumberPhone>
                    </div>
                    <span>Заказать звонок</span>
                </CallNumber>
                <LogIn>
                    <div>
                        <a><BsFillPersonFill size={18}/></a>
                        <span>Вход</span>
                    </div>
                    <div>Личный кабинет</div>
                </LogIn>
                <Button>Оставить заявку</Button>
            </UpperHeader>

            <LowerHeader>
                <LowerSection><GiHamburgerMenu /></LowerSection>
                {
                    arraySectionName.map((section: string, index: number) => (
                        <LowerSection key={index}>{section}</LowerSection>
                    ))
                }
            </LowerHeader>
        </AppHeaderTemplate>
    );
};

export default AppHeader;