import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FiIcons from "react-icons/fi";

export const SidebarData = [
    {
        title: ' Strateegia',
        path: '//https://app.strateegia.digital/signin',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },

    {
        title: ' G calendar',
        path: '//https://calendar.google.com/calendar',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },

    {
        title: ' Desenvolvedores',
        path: '/desenvolvedores',
        icon: <AiIcons.AiOutlineInfoCircle />,
        cName: 'nav-text'
    },

    {
        title: ' Sair',
        path: '/',
        icon: <FiIcons.FiLogOut />,
        cName: 'nav-text',
        click: 'onClick={handleLogout}'
    }
]
