import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { underscore } from '@nrwl/workspace/src/utils/strings';

export const addMockFile = (
  tree: Tree,
  projectName: string,
  mockFileName: string
): void => {
  const projectConfig = readProjectConfiguration(tree, projectName);
  const librarySourceRoot = `${projectConfig.sourceRoot}`;
  addIndexFile(tree, librarySourceRoot, mockFileName);
  addEmptyMockFile(tree, librarySourceRoot, mockFileName);
};

const addEmptyMockFile = (
  tree: Tree,
  librarySourceRoot: string,
  mockFileName: string
): void => {
  const mockFilePath = `${librarySourceRoot}/lib/mocks/${mockFileName}.mock.ts`;
  const mockVariableName = `${underscore(
    mockFileName
  )}_mock`.toLocaleUpperCase();
  tree.write(mockFilePath, `export const ${mockVariableName} = {};`);
};

const addIndexFile = (
  tree: Tree,
  librarySourceRoot: string,
  mockFileName: string
): void =>
  tree.write(
    `${librarySourceRoot}/testing.ts`,
    `export * from './lib/mocks/${mockFileName}.mock';`
  );
