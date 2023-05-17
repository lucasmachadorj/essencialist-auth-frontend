import { faker } from "@faker-js/faker";

export const buildUserManagerSettings = () => {
  return {
    authority: faker.internet.url(),
    client_id: faker.string.alpha(),
    redirect_uri: faker.internet.url(),
    response_type: faker.string.alpha(),
    scope: faker.string.alpha(),
    post_logout_redirect_uri: faker.internet.url(),
    silent_redirect_uri: faker.internet.url(),
    automaticSilentRenew: faker.datatype.boolean(),
    filterProtocolClaims: faker.datatype.boolean(),
    loadUserInfo: faker.datatype.boolean(),
    monitorSession: faker.datatype.boolean(),
    metadata: {
      end_session_endpoint: faker.internet.url(),
    },
  };
};
