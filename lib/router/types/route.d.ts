export interface Route {
    path: string;
    content: () => string;
}