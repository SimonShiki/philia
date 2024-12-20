import {BaseConfig} from './common';
import chalk from 'chalk';

const logLevels = ['debug', 'info', 'warn', 'error'];

enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR
}

export class Logger {
    private level: LogLevel;

    constructor (level: BaseConfig['log_level']) {
        this.level = logLevels.indexOf(level);
    }

    debug (...messages: unknown[]) {
        if (this.level <= LogLevel.DEBUG) {
            console.debug(chalk.gray(`[DEBUG] `), ...messages);
        }
    }

    info (...messages: unknown[]) {
        if (this.level <= LogLevel.INFO) {
            console.info(chalk.blue(`[INFO] `), ...messages);
        }
    }

    warn (...messages: unknown[]) {
        if (this.level <= LogLevel.WARN) {
            console.warn(chalk.yellow(`[WARN] `), ...messages);
        }
    }

    error (...messages: unknown[]) {
        if (this.level <= LogLevel.ERROR) {
            console.error(chalk.red(`[ERROR] `), ...messages);
        }
    }
}
