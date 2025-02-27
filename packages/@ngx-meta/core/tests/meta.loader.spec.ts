import { TestBed } from '@angular/core/testing';

import { MetaLoader, MetaService, MetaSettings, MetaStaticLoader } from '../index';

import { defaultSettings, emptySettings, testModuleConfig, testSettings } from './common';

describe('@ngx-meta/core:', () => {
  beforeEach(() => {
    const metaFactory = () => new MetaStaticLoader(testSettings);

    testModuleConfig({
      provide: MetaLoader,
      useFactory: metaFactory
    });
  });

  describe('MetaLoader', () => {
    it('should be able to return the default settings', () => {
      const loader = new MetaStaticLoader();
      const loadedApiEndpoint = loader.settings;

      expect(loadedApiEndpoint).toEqual(defaultSettings);
    });

    it('should be able to provide `MetaStaticLoader`', () => {
      const metaFactory = () => new MetaStaticLoader(testSettings);

      testModuleConfig({
        provide: MetaLoader,
        useFactory: metaFactory
      });

      const meta = TestBed.get(MetaService);

      expect(MetaStaticLoader).toBeDefined();
      expect(meta.loader).toBeDefined();
      expect(meta.loader instanceof MetaStaticLoader).toBeTruthy();
    });

    it('should be able to provide any `MetaLoader`', () => {
      class CustomLoader implements MetaLoader {
        get settings(): MetaSettings {
          return emptySettings;
        }
      }

      testModuleConfig({
        provide: MetaLoader,
        useClass: CustomLoader
      });

      const meta = TestBed.get(MetaService);

      expect(CustomLoader).toBeDefined();
      expect(meta.loader).toBeDefined();
      expect(meta.loader instanceof CustomLoader).toBeTruthy();
    });
  });
});
