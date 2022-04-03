import {
  checkFilesExist,
  ensureNxProject,
  runNxCommandAsync,
} from '@nrwl/nx-plugin/testing';

describe('domainTest e2e', () => {
  const groupingFolder = 'libs/ng-test-app/test-domain';
  beforeAll(async () => {
    ensureNxProject('@srleecode/domain', 'dist/packages/domain');
    await runNxCommandAsync(`generate @srleecode/domain:ng-add`);
    await runNxCommandAsync(
      `generate @srleecode/domain:appGroupingFolder --name test-app --applicationType ng`
    );
    await runNxCommandAsync(
      `generate @srleecode/domain:domainGroupingFolder --name test-domain --groupingFolder libs/ng-test-app`
    );
  });
  it('should create e2e project for domain', async () => {
    await runNxCommandAsync(
      `generate @srleecode/domain:domainTest --groupingFolder ${groupingFolder}`
    );
    checkFilesExist(`${groupingFolder}/.e2e/cypress.json`);
    checkFilesExist(`${groupingFolder}/.e2e/project.json`);
  });
  it('should create ct project for domain', async () => {
    await runNxCommandAsync(
      `generate @srleecode/domain:domainTest --groupingFolder ${groupingFolder} --type ct`
    );
    checkFilesExist(`${groupingFolder}/.ct/cypress.json`);
    checkFilesExist(`${groupingFolder}/.ct/project.json`);
  });
});
