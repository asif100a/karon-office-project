import { Href } from "expo-router";

type RouteMap = Record<string, Href>;

const AuthRoutes: Href = "/auth";

const CommonRoutes: RouteMap = {
  NOTIFICATIONS: "/screens/common/Notifications",
};

const WorkerRoutes: RouteMap = {
  WORKER_HOME: "/tabs/(worker-tabs)",
  WORKER_DETAILS: "/screens/worker-details/[id]",
  SEARCH_WORKER: "/screens/search/SearchWorker",
};

const EmployerRoutes: RouteMap = {
  EMPLOYER_HOME: "/tabs/(employer-tabs)",
  EMPLOYER_DETAILS: "/screens/employer-details/[id]",
  SEARCH_EMPLOYER: "/screens/search/SearchEmployer",
};

export const Routes = { AuthRoutes, CommonRoutes, WorkerRoutes, EmployerRoutes };

export type Routes = typeof Routes;
