import { logger, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/angular/generators';
import { getMockFileResolutionPath } from './get-mock-file-resolution-path';

describe('getMockFileResolutionPath', () => {
  let appTree: Tree;

  beforeEach(async () => {
    appTree = createTreeWithEmptyWorkspace();
    await libraryGenerator(appTree, {
      name: 'feature-test-example',
      directory: 'test-app/test-domain',
    }).catch((e: Error) => {
      logger.error(e.message);
      logger.error(e.stack);
      throw e;
    });
  });
  it('should return mock file resolution path for project', () => {
    expect(
      getMockFileResolutionPath(
        appTree,
        'test-app/test-domain/feature-test-example'
      )
    ).toBe('@proj/test-app/test-domain/feature-test-example/testing');
  });
});
