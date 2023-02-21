import React, { useEffect, useState } from 'react';
import {
    AppShell,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    createStyles,
    Container,
} from '@mantine/core';
import Sidebar from "../components/Sidebar"
import NavbarDropdown from '../components/NavbarDropdown';
import { getUser, isLoggedIn } from '../utils/user';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
}));

interface ILayoutProps {
    children: React.ReactNode,
    title : string
}

const Layout: React.FC<ILayoutProps> = ({ children, title }) => {
    const user = getUser();
    const isAuth = isLoggedIn();
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const { classes } = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = title + " | School Admission";

        if (!isAuth) {
            navigate('/login')
        }
    }, [title]);

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Sidebar hidden={opened}></Sidebar>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <div className={classes.inner}>
                            <Text fw={500}>ระบบรับสมัครนักเรียน</Text>

                            <NavbarDropdown user={user}></NavbarDropdown>
                        </div>
                    </div>
                </Header>
            }
        >
            <Container>
                {children}
            </Container>
        </AppShell>
    );
}

export default Layout;