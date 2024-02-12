import { fs, path } from "@brandingbrand/code-cli-kit";

import { bundleRequire, config, defineAction } from "@/lib";

/**
 * Define an action to process environment files.
 * @remarks
 * This action reads environment files from a specified directory, validates their names and formats, and then processes them accordingly.
 * @returns {Promise<void>} - Promise that resolves when the action completes successfully.
 * @throws {Error} - Throws an error if the environment directory doesn't exist or if it doesn't contain any valid environment files.
 */
export default defineAction(async () => {
  // Resolve the environment directory path based on the configuration
  const envDir = path.project.resolve(config.code.envPath);

  // Check if the environment directory exists
  if (!(await fs.doesPathExist(envDir))) {
    throw Error(
      `[EnvActionError]: env directory: ${envDir}, does not exist. Please check the "envPath" attribute in flagship-code.config.ts.`
    );
  }

  // Read the contents of the environment directory and filter out files matching the expected pattern
  const envs = (await fs.readdir(envDir)).filter((it) =>
    /env\..*\.ts/.test(it)
  );

  // Throw an error if no valid environment files are found in the directory
  if (!envs.length) {
    throw Error(
      `[EnvActionError]: env directory: ${envDir}, does not contain any env files that match the pattern "env.<mode>.ts". Please move your env files to ${envDir}.`
    );
  }

  // Read the contents of each environment file and validate its name and format
  const envContents = await Promise.all(
    envs.map(async (it) => {
      const envRegExpExecArray = /env\.(.*)\.ts/.exec(it);
      const content = (await bundleRequire(path.resolve(envDir, it))).default;

      const name = envRegExpExecArray?.pop();

      // Throw an error if the environment file doesn't follow the expected format
      if (!name) {
        throw Error(
          `[EnvActionError]: env file ${it} does not follow expected format "env.<mode>.ts"`
        );
      }

      return {
        name,
        content,
      };
    })
  );

  // Import the 'magicast' module due to esm type
  const magicast = await import("magicast");

  // Parse a module with an empty default export
  const mod = magicast.parseModule("export default { }");

  // Add each environment's content to the module's default export
  envContents.forEach((it) => {
    mod.exports.default[it.name] ||= { app: it.content };
  });

  // Resolve the path of the project environment index file from @brandingbrand/fsapp
  // If this does not exist it will throw an error
  const projectEnvIndexPath = require.resolve(
    "@brandingbrand/fsapp/src/project_env_index.js"
  );

  // Write the module to the project environment index file
  magicast.writeFile(mod, projectEnvIndexPath);
}, "env");
