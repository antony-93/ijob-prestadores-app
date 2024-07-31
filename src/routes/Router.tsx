import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { AuthContext, useAuth } from "../core/context/Auth";
import { AppTabs } from "./AppTabs";
import { Apps } from "@mui/icons-material";

export function Router() {
    const { authData } = useAuth();

    return (
        <NavigationContainer>
            {authData ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}