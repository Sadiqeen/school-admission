import { useEffect, useState } from 'react';
import { createStyles, Navbar } from '@mantine/core';
import {
    IconHome2,
    IconBook2,
    IconLogout,
} from '@tabler/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from '../constants/path';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            marginBottom: theme.spacing.md,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                    .background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                },
            },
        },
    };
});

interface ISidebarProps {
    hidden : boolean
}

const data = [
    { link: PATH.DASHBOARD, label: 'Dashboard', icon: IconHome2 },
    { link: PATH.COURSE, label: 'Course', icon: IconBook2 },
    // { link: 'class', label: 'Class', icon: IconSchool },
    // { link: 'applicant', label: 'Applicant', icon: IconUsers },
    // { link: 'settings', label: 'Settings', icon: IconSettings },
];

const Sidebar: React.FC<ISidebarProps> = (props) => {
    const { classes, cx } = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [url, setUrl] = useState<string>("");

    const pushPage = (link : string) => {
        if (url !== link) {
            navigate(link, { replace: true });
        }
    }

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);
    
    const links = data.map((item) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: item.link === url })}
            href={"#"}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                pushPage(item.link);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <Navbar height={700} hidden={!props.hidden} width={{ sm: 250 }} p="md">
            <Navbar.Section grow>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}

export default Sidebar;