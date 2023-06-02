import fs from "fs/promises";
import httpStatus from "http-status";

import { ApiError } from "./apiError.js";

export class FileUtils {
  fileModule;
  pathModule;

  constructor(fsMudule, pathModule) {
    this.fileModule = fsMudule;
    this.pathModule = pathModule;
  }

  getAbsoluteFilePath({ dirname, filePath, fileName }) {
    console.log({ dirname, filePath, fileName });
    const absoluteFilePath = this.pathModule.resolve(
      this.pathModule.join(dirname, filePath, fileName)
    );

    return absoluteFilePath;
  }

  async checkFileExist(absoluteFilePath) {
    try {
      return this.fileModule.exist(absoluteFilePath);
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong!"
      );
    }
  }

  async readFile(absoluteFilePath) {
    try {
      const data = await this.fileModule.readFile(absoluteFilePath, "utf8");
      console.log({ data });
      return data;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        error.message || "Something went wrong!"
      );
    }
  }

  async writeToFile(absoluteFilePath) {
    try {
      await this.fileModule.writeFile(absoluteFilePath, "");
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong!"
      );
    }
  }
}

