import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { routeList } from "./routes.ts";
import { LazyComponentLoader } from "./routes/definition/lazy-component-loader.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routeList.map((route, index) => {
          if (route.redirect) {
            return (
              <Route
                key={index}
                path={route.route()}
                Component={() => (
                  <Navigate to={route.redirect as string} replace={true} />
                )}
              />
            );
          }

          return (
            <Route
              key={index}
              path={route.route()}
              Component={() => <LazyComponentLoader route={route} />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
