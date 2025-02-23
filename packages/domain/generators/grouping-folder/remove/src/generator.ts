import {
  Tree,
  convertNxGenerator,
  logger,
  readProjectConfiguration,
} from '@nrwl/devkit';
import { RemoveGeneratorSchema } from './schema';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  getDasherizedFolderPath,
  getProjectNames,
  isHavingDepContraint,
  isHavingMockFile,
  removeDepConstraint,
} from '../../../shared/utils';
import { removeGenerator as nrwlRemoveGenerator } from '@nrwl/workspace';
import { removeMockFileResolutionPath } from './lib/remove-mock-file-resolution-path';

export async function removeGenerator(
  tree: Tree,
  options: RemoveGeneratorSchema
): Promise<void> {
  const { groupingFolder } = options;
  const projectNames = getProjectNames(tree, groupingFolder);
  for (const projectName of projectNames) {
    const project = readProjectConfiguration(tree, projectName);
    if (isHavingMockFile(tree, project.root)) {
      removeMockFileResolutionPath(tree, project.root);
    }
    await nrwlRemoveGenerator(tree, {
      projectName,
      skipFormat: false,
      forceRemove: true,
    }).catch((e: Error) => {
      logger.error(e.message);
      logger.error(e.stack);
      throw e;
    });
    const folder = project.root.split('/').slice(0, -1).join('/');
    const sourceTag = `scope:${getDasherizedFolderPath(tree, folder)}`;
    if (isHavingDepContraint(tree, sourceTag)) {
      removeDepConstraint(tree, sourceTag);
    }
  }
  tree.delete(groupingFolder);
}

export default removeGenerator;

export const removeSchematic = convertNxGenerator(removeGenerator);
