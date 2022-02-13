import { HomeOutlined, MessageOutlined, TeamOutlined } from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons/lib'
import React from 'react'

export interface SideMenuElement {
  items?: SideMenuElement[]

  key: string
  name: string
  group?: boolean
  href?: string
  icon?: JSX.Element
  role?: 'superuser' | 'admin'
}

export const sideMenu: SideMenuElement[] = [
  {
    key: 'home',
    name: 'admin:home',
    href: '/admin',
    icon: <HomeOutlined />,
  },
  {
    key: 'profile',
    name: 'admin:profile',
    href: '/admin/profile',
    icon: <UserOutlined />,
  },
  {
    key: 'public',
    name: 'admin:forms',
    group: true,
    role: 'admin',
    items: [
      {
        key: 'forms',
        name: 'admin:forms',
        href: '/admin/forms',
        icon: <MessageOutlined />,
      },
    ],
  },
  {
    key: 'administration',
    name: 'admin:administration',
    group: true,
    role: 'superuser',
    items: [
      {
        key: 'users',
        name: 'admin:users',
        href: '/admin/users',
        icon: <TeamOutlined />,
      },
    ],
  },
]
