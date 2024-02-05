/* eslint-disable global-require */
/* eslint-disable no-loop-func */

const fs = require('fs');
const path = require('path');
const { convertSchema } = require('joi-to-typescript');
const prettier = require('prettier');

const dirsToRead = [];
const directoryPath = './DTO';
const ignoreDirectories = ['Typing', 'SharedDTO'];
const interfaces = { RequestDTO: [], EntityDTO: [] };

const UserAliasPattern = `isMobile?: boolean;\n  isTV?: boolean;\n  uAgeParam?: number;\n  userAge?: number;\n  userId?: object;`;
const PaginationAliasPattern = `isMobile?: boolean;\n  isTV?: boolean;\n  limit: number;\n  searchRegExp?: any;\n  skip: number;\n  uAgeParam?: number;\n  userAge?: number;\n  userId?: object;`;

fs.readdirSync(directoryPath).forEach((file) => {
  const stats = fs.statSync(`${directoryPath}/${file}`);

  if (stats.isDirectory() && !ignoreDirectories.includes(file)) {
    dirsToRead.push(file);
  }
});

for (const dir of dirsToRead) {
  fs.readdirSync(`${directoryPath}/${dir}`).forEach((file) => {
    const stats = fs.statSync(path.join(directoryPath, dir, file));

    if (stats.isFile()) {
      // eslint-disable-next-line import/no-dynamic-require
      const fileExports = require(`./${dir}/${file}`);

      for (const [name, dto] of Object.entries(fileExports)) {
        let type = convertSchema({ useLabelAsInterfaceName: false }, dto.meta({ className: name }))
          ?.content?.replace('interface', 'type')
          .replace(' {', ' = {');

        if (type?.includes(PaginationAliasPattern) && !type?.includes('type Pagination = {')) {
          type = type?.replace(PaginationAliasPattern, '');

          type = type?.replace('}', '} & Pagination');
        }

        if (type?.includes(UserAliasPattern) && !type?.includes('type User = {')) {
          type = type?.replace(UserAliasPattern, '');

          type = type?.replace('}', '} & User');
        }

        interfaces[dir].push(type);
      }
    }

    if (stats.isDirectory() && !ignoreDirectories.includes(file)) {
      dirsToRead.push(file);
    }
  });
}

fs.writeFileSync(
  `./DTO/Typing/index.d.ts`,

  prettier.format(
    `
  declare namespace DTO {
      namespace Request {
          ${interfaces.RequestDTO.join(';')} 
      }
      namespace Entity {
          ${interfaces.EntityDTO.join(';')} 
      }
  }`,
    {
      parser: 'typescript',
      printWidth: 120,
      tabWidth: 2,
    }
  )
);
