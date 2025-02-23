import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

export const addImplicitDependency = (
  tree: Tree,
  projectName: string,
  dependentProjectName: string
): void => {
  const projectConfig = readProjectConfiguration(tree, projectName);
  projectConfig.implicitDependencies = [
    ...(projectConfig.implicitDependencies || []),
    dependentProjectName,
  ];
  updateProjectConfiguration(tree, projectName, projectConfig);
};
