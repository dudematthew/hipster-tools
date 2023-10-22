import * as yaml from 'js-yaml';
import {
    readFileSync
} from 'fs';
import {
    join
} from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
    let config;
    try {
      config = yaml.load(
        readFileSync(join(__dirname, '../', YAML_CONFIG_FILENAME), 'utf8'),
      );
    } catch (error) {
        // If the file is not found, try to load from the root directory
        if (error.code === 'ENOENT') {
            config = yaml.load(
            readFileSync(join(__dirname, '../../', YAML_CONFIG_FILENAME), 'utf8'),
            );
        } else {
            throw error;
        }
    }
    return config as Record<string, any>;
  };