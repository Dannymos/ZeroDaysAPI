import { Inject, Injectable } from '@nestjs/common';
import { Connection, getRepository } from 'typeorm';
import * as path from 'path';
import {
  Builder, Loader, Parser, Resolver,
} from 'typeorm-fixtures-cli/dist';

@Injectable()
export default class TestUtilities {
  @Inject(Connection)
  connection: Connection;

  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('UTILS-CALLED-OUTSIDE-TEST-ERROR');
    }
  }

  async resetDatabase(): Promise<void> {
    return this.connection.synchronize(true);
  }

  loadFixtures(): void {
    this.resetDatabase().then(() => {
      const loader = new Loader();
      loader.load(path.resolve('./test/e2e/utilities/fixtures'));

      const resolver = new Resolver();
      const fixtures = resolver.resolve(loader.fixtureConfigs);
      const builder = new Builder(this.connection, new Parser());

      fixtures.forEach((fixture) => {
        const builtEntity = builder.build(fixture);
        getRepository(builtEntity.constructor.name).save(builtEntity);
      });
    });
  }
}
