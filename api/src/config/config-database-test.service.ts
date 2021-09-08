import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigDatabaseTestService {
    private forRootTypeOrmRepository = {
        type: "postgres",
        host: "postgres",
        port: 5432,
        username: "postgres",
        password: "changeme",
        database: "Breshow",
        entities: ["dist/**/entities/*.entity{.ts,.js}"],
        synchronize: true,
        subscribers: ["dist/subscribers/**/*{.js,.ts}"],
        migrations: ["dist/migrations/*{.ts,.js}"],
        migrationsTableName: "migrations_typeorm",
        migrationsRun: true,
        autoLoadEntities: true
      } as any;

    constructor(private env: { [k: string]: string | undefined }) { }
  
    getForRootConfig() {
        return this.forRootTypeOrmRepository;
    }
  
  }
  
  const configDatabaseTestService = new ConfigDatabaseTestService(process.env);
  
  export { configDatabaseTestService };
