import { Tree } from '@nrwl/devkit';
import {
  getGroupingFolders,
  updateDepConstraint,
} from '@srleecode/domain/shared/utils';
import { CreateDomainGroupingFolderGeneratorSchema } from '../schema';

export const addSharedLintContraints = (
  tree: Tree,
  options: CreateDomainGroupingFolderGeneratorSchema
): void => {
  const { name, baseFolder } = options;
  const groupingFolders = getGroupingFolders(tree, `${baseFolder}/${name}`);
  const scope = `scope:${groupingFolders.app}-${groupingFolders.domain.join(
    '-'
  )}`;
  updateDepConstraint(tree, (depConstraints) => {
    depConstraints.push({
      sourceTag: scope,
      onlyDependOnLibsWithTags: [scope],
    });
    if (groupingFolders.domain.length > 1) {
      depConstraints.push({
        sourceTag: scope,
        onlyDependOnLibsWithTags: [
          `scope:${groupingFolders.app}-${groupingFolders.domain[0]}-shared`,
        ],
      });
    }
    depConstraints.push({
      sourceTag: scope,
      onlyDependOnLibsWithTags: [`scope:${groupingFolders.app}-shared`],
    });
    depConstraints.push({
      sourceTag: scope,
      onlyDependOnLibsWithTags: [`app:shared`],
    });
  });
};
