import { RouteObject } from "react-router-dom";
import PageContainer from "../../components/layout/page-container";
import { Paths } from "../../constants/route-paths";
import { Battleship } from "../../containers/battleship/battleship";
import GameHistory from "../../containers/game-history/history";
import GameSetup from "../../containers/game-setup/setup";

export const routes: RouteObject[] = [
  {
    path: Paths.HOME,
    element: <PageContainer />,
    children: [
      {
        element: <Battleship />,
        index: true,
      },
      {
        path: Paths.GAME.SETUP,
        element: <GameSetup />,
      },
      {
        path: Paths.GAME.HISTORY,
        element: <GameHistory />,
      }
    ]
  }
];