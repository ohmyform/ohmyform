import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons/lib'
import { Alert, Dropdown, Layout, Menu, PageHeader, Select, Space, Spin, Tag } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { CSSProperties, FunctionComponent } from 'react'
import GitHubButton from 'react-github-button'
import { useTranslation } from 'react-i18next'
import { useMeQuery } from '../graphql/query/me.query'
import { languages } from '../i18n'
import { sideMenu, SideMenuElement } from './sidemenu'
import { useWindowSize } from './use.window.size'
import { clearAuth } from './with.auth'

const { SubMenu, ItemGroup } = Menu
const { Header, Content, Sider } = Layout

interface BreadcrumbEntry {
  name: string
  href?: string
  as?: string
}

interface Props {
  loading?: boolean
  padded?: boolean
  style?: CSSProperties

  selected?: string

  breadcrumbs?: BreadcrumbEntry[]
  title?: string
  subTitle?: string
  extra?: JSX.Element[]
  error?: string
}

export const Structure: FunctionComponent<Props> = (props) => {
  const { t, i18n } = useTranslation()
  const size = useWindowSize()
  const [userMenu, setUserMenu] = React.useState(false)
  const [open, setOpen] = React.useState<string[]>()
  const [selected, setSelected] = React.useState<string[]>()
  const [sidebar, setSidebar] = React.useState(size.width < 700)
  const router = useRouter()
  const user = useMeQuery()

  React.useEffect(() => {
    if (sidebar !== size.width < 700) {
      setSidebar(size.width < 700)
    }
  }, [size.width])

  React.useEffect(() => {
    if (props.selected) {
      const parts = props.selected.split('.')

      const last = parts.pop()

      if (parts.length > 0) {
        setOpen(parts)
      }

      setSelected([last])
    }
  }, [props.selected])

  const buildMenu = (data: SideMenuElement[]): JSX.Element[] => {
    return data
      .filter((element) => {
        if (!element.role) {
          return true
        }

        if (user.loading) {
          return false
        }

        return user.data?.me.roles.includes(element.role)
      })
      .map(
        (element): JSX.Element => {
          if (element.items && element.items.length > 0) {
            if (element.group) {
              return (
                <ItemGroup
                  key={element.key}
                  title={
                    <Space
                      style={{
                        textTransform: 'uppercase',
                        paddingTop: 16,
                        fontWeight: 'bold',
                        color: '#444',
                      }}
                    >
                      {element.icon}
                      <div>
                        {t(element.name)}
                      </div>
                    </Space>
                  }
                >
                  {buildMenu(element.items)}
                </ItemGroup>
              )
            }

            return (
              <SubMenu
                key={element.key}
                title={
                  <Space>
                    {element.icon}
                    <div>
                      {t(element.name)}
                    </div>
                  </Space>
                }
              >
                {buildMenu(element.items)}
              </SubMenu>
            )
          }

          return (
            <Menu.Item
              onClick={async () => {
                if (element.href) {
                  await router.push(element.href)
                }
              }}
              key={element.key}
            >
              <Space>
                {element.icon}
                <div>
                  {t(element.name)}
                </div>
              </Space>
            </Menu.Item>
          )
        }
      )
  }

  const signOut = (): void => {
    clearAuth()
    router.reload()
  }

  return (
    <Layout style={{ height: '100vh' }} className={'admin'}>
      <Header
        style={{
          paddingLeft: 0,
        }}
      >
        <Space
          style={{
            float: 'left',
            color: '#FFF',
            fontSize: 14,
            marginRight: 26,
            fontWeight: 'bold',
          }}
        >
          {React.createElement(sidebar ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'sidebar-toggle',
            onClick: () => setSidebar(!sidebar),
          })}

          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <img
              height={40}
              src={require('../assets/images/logo_white.png?resize&size=256')}
              alt={'OhMyForm'}
            />
          </div>
        </Space>
        <div style={{ float: 'right', display: 'flex', height: '100%' }}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'profile'} onClick={() => router.push('/admin/profile')}>Profile</Menu.Item>
                <Menu.Divider key={'d1'} />
                <Menu.Item key={'logout'} onClick={signOut}>Logout</Menu.Item>
              </Menu>
            }
            onVisibleChange={setUserMenu}
            visible={userMenu}
          >
            <Space
              style={{
                color: '#FFF',
                alignItems: 'center',
                display: 'inline-flex',
              }}
            >
              <div>Hi {user.data && user.data.me.username},</div>
              <UserOutlined style={{ fontSize: 24 }} />
              <CaretDownOutlined />
            </Space>
          </Dropdown>
        </div>
      </Header>
      <Layout
        style={{
          height: '100%',
        }}
      >
        <Sider
          collapsed={sidebar}
          trigger={null}
          collapsedWidth={0}
          breakpoint={'xs'}
          width={200}
          style={{
            background: '#fff',
            maxHeight: '100%',
            overflow: 'auto',
          }}
          className={'sidemenu'}
        >
          <Menu
            mode="inline"
            style={{ flex: 1 }}
            defaultSelectedKeys={['1']}
            selectedKeys={selected}
            onSelect={(s): void => setSelected(s.keyPath )}
            openKeys={open}
            onOpenChange={(open): void => setOpen(open )}
          >
            {buildMenu(sideMenu)}
          </Menu>
          <Menu mode="inline" selectable={false}>
            <Menu.Item className={'language-selector'} key={'language-selector'}>
              <Select
                bordered={false}
                value={i18n.language.replace(/-.*/, '')}
                onChange={(next) => i18n.changeLanguage(next)}
                style={{
                  width: '100%',
                }}
              >
                {languages.map((language) => (
                  <Select.Option value={language} key={language}>
                    {t(`language:${language}`)}
                  </Select.Option>
                ))}
              </Select>
            </Menu.Item>
            <Menu.Item style={{ display: 'flex', alignItems: 'center' }} key={'github'}>
              <GitHubButton type="stargazers" namespace="ohmyform" repo="ohmyform" />
            </Menu.Item>
            <Menu.Item key={'version'}>
              Version: <Tag color="gold">{process.env.version}</Tag>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{ padding: '0 24px 24px', minHeight: 500, height: '100%', overflow: 'auto' }}
        >
          {props.title && (
            <PageHeader
              title={props.title}
              subTitle={props.subTitle}
              extra={props.extra}
              breadcrumb={{
                routes: [
                  ...(props.breadcrumbs || []).map((b) => ({
                    breadcrumbName: b.name,
                    path: '',
                  })),
                  {
                    breadcrumbName: props.title,
                    path: '',
                  },
                ],
                params: props.breadcrumbs,
                itemRender(route, params: BreadcrumbEntry[], routes) {
                  if (routes.indexOf(route) === routes.length - 1) {
                    return <span>{route.breadcrumbName}</span>
                  }

                  const entry = params[routes.indexOf(route)]

                  return (
                    <Link href={entry.href} as={entry.as || entry.href}>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a>{entry.name}</a>
                    </Link>
                  )
                },
              }}
            />
          )}

          {props.error && (
            <Alert message={props.error} type={'error'} style={{ marginBottom: 24 }} />
          )}

          <Spin spinning={!!props.loading}>
            <Content
              style={{
                background: props.padded ? '#fff' : null,
                padding: props.padded ? 24 : 0,
                ...props.style,
              }}
            >
              {props.children}
            </Content>
          </Spin>
        </Layout>
      </Layout>
    </Layout>
  )
}

Structure.defaultProps = {
  padded: true,
  style: {},
}

export default Structure
