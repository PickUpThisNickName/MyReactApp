import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { Cabinet } from "./components/Cabinet";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/cabinet',
    requireAuth: true,
    element: <Cabinet />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
