import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: "http://localhost:28080/auth/",
          realm: 'breshowAD',
          clientId: 'react-breshow',
        }
      });
}