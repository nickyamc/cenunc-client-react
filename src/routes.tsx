import {createBrowserRouter} from "react-router-dom";
import {Error404} from "./pages/Error";
import {Begin, Dashboard, LogIn, Register, Users} from "./pages";
import Labs from "./pages/Labs/Labs";
import Events from "./pages/Event/Events";
import Visitors from "./pages/Visitors/Visitors.tsx";
import Attendances from "./pages/Attendances/Attendances.tsx";
import Session from "./pages/Session/Session.tsx";
import QrGeneratorSession from "./pages/Session/QrGeneratorSession.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Begin/>,
        errorElement: <Error404/>,
        children: [
            {
                index: true,
                element: <Dashboard/>,
            },
            {
                path: "users",
                element: <Users/>,
            },
            {
                path: "customers",
                element: <Visitors/>,
            },
            {
                path: "labs",
                element: <Labs/>,
            },
            {
                path: "events",
                element: <Events/>,
            },
            {
                path: "attendances",
                element: <Attendances/>,
            },
            {
                path: "sessions",
                element: <Session/>,
            },
            {
                path: "sessions/qr",
                element: <QrGeneratorSession />,
            }
        ],
    },
    {
        path: "/login",
        element: <LogIn/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
]);

export default router;
