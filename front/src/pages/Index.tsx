import { Stack, Title } from "@mantine/core";
import React from "react";
import Layout from "../layouts/default";

const Index: React.FC = () => {
    return (
        <Layout title="Dashboard">
            <Stack spacing="xs" sx={(theme) => ({ backgroundColor: theme.colors.pink[1], height: 300 })}>
                <Title>This is Index page</Title>
            </Stack>
        </Layout>
    )
}

export default Index;