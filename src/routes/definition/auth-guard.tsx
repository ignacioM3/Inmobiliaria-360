import type { PropsWithChildren } from "react";
import { UserRole } from "../../types/use-role";
import { Navigate } from "react-router-dom";

export interface AuthGuardProps {
  allowedRoles?: UserRole[];
}

export function AuthGuard({
  children,
  allowedRoles,
}: PropsWithChildren<AuthGuardProps>) {
  const currentUser = {
    role: UserRole.USER,
  };

  if (allowedRoles && !currentUser) {
    return <Navigate to="/unauthorized" />;
  }

  if (currentUser && allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return <>{children}</>;
}
