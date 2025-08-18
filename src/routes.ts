import type { RouterDefinition } from "./routes/definition/routes-definition";
import { publicRoutes } from "./routes/public-routes";


export const AppRoutes = {
    ...publicRoutes,
     error: {
        route: () => "*",
        redirect: "/"
    }
} as const satisfies Record<string, RouterDefinition>
export type Routes = keyof typeof AppRoutes

export const routeList: RouterDefinition[] = Object.values(AppRoutes)