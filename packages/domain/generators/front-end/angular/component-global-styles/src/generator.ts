import { convertNxGenerator, formatFiles, Tree } from '@nrwl/devkit';
import { addBaseComponentDeclaration } from './lib/add-base-component-declaration';
import { addBaseComponentImport } from './lib/add-base-component-import';
import { addBaseComponentToTemplate } from './lib/add-base-component-to-template';
import { addFiles } from './lib/add-files';
import { getComponentClassName } from './lib/get-component-class-name';
import { getComponentFilePath } from './lib/get-component-file-path';
import { CreateComponentGlobalStylesGeneratorSchema } from './schema';
import { getComponentSelector } from './lib/get-component-selector';

export async function createComponentGlobalStylesGenerator(
  tree: Tree,
  options: CreateComponentGlobalStylesGeneratorSchema
): Promise<void> {
  const { componentLibraryPath } = options;
  const basePath = `${componentLibraryPath}/src/lib`;
  const componentFilePath = getComponentFilePath(tree, basePath);
  const componentClassName = getComponentClassName(
    tree,
    componentFilePath
  ).replace('Component', 'BaseComponent');
  const selector = getComponentSelector(tree, componentFilePath);
  addFiles(tree, basePath, componentClassName, selector);
  addBaseComponentImport(tree, componentFilePath, componentClassName);
  addBaseComponentDeclaration(tree, componentFilePath, componentClassName);
  addBaseComponentToTemplate(tree, componentFilePath, selector);
  await formatFiles(tree);
}

export default createComponentGlobalStylesGenerator;

export const createComponentGlobalStylesSchematic = convertNxGenerator(
  createComponentGlobalStylesGenerator
);
