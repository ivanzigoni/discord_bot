import fs from 'fs';
import { join } from 'path';

const walk = function(dir: any) {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file: string) {
      file = dir + '/' + file;
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) { 
          /* Recurse into a subdirectory */
          results = results.concat(walk(file));
      } else { 
          /* Is a file */
          results.push(join(__dirname, "..", file));
      }
  });
  // return results.map((result: string) => result.split("/")[result.split("/").length - 1].split(".")[0]);
  return results;
}

export default walk;