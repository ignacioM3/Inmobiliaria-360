export const publicRoutes = {
    home : {
        route: () => "/",
        page: async () => ((await import('../pages/PanoViewers')).TourViewer)
    }
}