import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "database_felps"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test"
      ? "localhost"
      : host, //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
      database: process.env.NODE_ENV === "test" // Here I am checking the NODE_ENV variable, and if it is equal test, I am running the test database instead of the production one.
        ? "rentx_test"
        : defaultOptions.database,
    })
  );
}