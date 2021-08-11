import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "database_felps"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host, //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    })
  );
}