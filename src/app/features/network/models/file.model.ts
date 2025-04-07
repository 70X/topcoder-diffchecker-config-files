import { Action } from 'rxjs/internal/scheduler/Action';

export interface FilesUpload {
  source: File;
  target: File;
}

export interface LineInfo {
  position: number;
  text: string;
  action: ActionType;
}
export interface FileLines {
  filePath: File;
  lines: LineInfo[];
}

export enum ActionType {
  ADD = 'a',
  DELETE = 'd',
  CHANGE = 'c',
}

export interface RangeLines {
  from: number;
  to: number;
}

export interface DiffObj {
  source: RangeLines;
  target: RangeLines;
  action: ActionType;
}

export interface WorkingFiles {
  source: FileLines;
  target: FileLines;
  diffList: DiffObj[];
}

export class FileDeserialize {
  public static rangeLines = (record: any): RangeLines => {
    const row = +record;
    if (!Number.isNaN(row)) {
      return { from: row, to: null };
    }
    const range = record.split(',');
    return {
      from: +range[0],
      to: +range[1],
    };
  };

  public static diffObj = (record: any): DiffObj => ({
    source: record.source ? FileDeserialize.rangeLines(record.source) : null,
    target: record.target ? FileDeserialize.rangeLines(record.target) : null,
    action: record.action,
  });

  public static fileLines = (record: string[]): FileLines => {
    const file: FileLines = {} as FileLines;
    file.lines = [];
    record.forEach((text, index) => {
      const line: LineInfo = {} as LineInfo;
      line.text = text;
      line.position = index + 1;
      line.action = null;
      file.lines.push(line);
    });
    return file;
  };

  public static updateFileLinesAction(
    file: FileLines,
    diffObj: DiffObj[],
    keyFile: string
  ): FileLines {
    diffObj.forEach((diff: DiffObj) => {
      const from = diff[keyFile].from - 1;
      const to = diff[keyFile].to - 1;
      for (let i = from; i <= to; i++) {
        file.lines[i].action = diff.action;
      }
    });
    return file;
  }

  public static workingFiles = (record: any): WorkingFiles => {
    const diffObj = record.diff
      ? record.diff.map(FileDeserialize.diffObj)
      : null;
    const source: FileLines = record.source
      ? FileDeserialize.fileLines(record.source)
      : null;
    const target: FileLines = record.target
      ? FileDeserialize.fileLines(record.target)
      : null;
    FileUtility.computeSourceTargetFiles(source, target, diffObj);

    return {
      source,
      target,
      diffList: diffObj,
    } as WorkingFiles;
  };
}

export class FileSerialize {
  public static filter = (lines: string[]): any => ({
    ...lines,
  });

  public static filesUpload = (filesUpload: FilesUpload): any => {
    return { source: filesUpload.source, target: filesUpload.target };
  };
}

class FileUtility {
  public static computeSourceTargetFiles(
    source: FileLines,
    target: FileLines,
    diffObj: DiffObj[]
  ): void {
    diffObj.forEach((diff: DiffObj) => {
      FileUtility.updateActionInFileLines(source, diff.source, diff.action);
      FileUtility.updateActionInFileLines(target, diff.target, diff.action);
    });
    diffObj.forEach((diff: DiffObj) => {
      FileUtility.insertEmptyLines(source, target, diff);
    });
  }

  private static insertEmptyLines(
    source: FileLines,
    target: FileLines,
    diff: DiffObj
  ) {
    if (diff.action === ActionType.ADD) {
      const emptyLines = FileUtility.createEmptyArray(
        diff.target.to - diff.target.from
      );
      source.lines.splice(diff.source.from, 0, ...emptyLines);
    } else if (diff.action === ActionType.DELETE) {
      const emptyLines = FileUtility.createEmptyArray(
        diff.source.to - diff.source.from
      );
      target.lines.splice(diff.target.from, 0, ...emptyLines);
    }
  }

  private static createEmptyArray(length: number): any[] {
    const emptyLines = [];
    for (let i = 0; i <= length; i++) {
      emptyLines.push(null);
    }
    return emptyLines;
  }

  private static updateActionInFileLines(
    file: FileLines,
    range: RangeLines,
    action: ActionType
  ): void {
    const from = range.from;
    const to = range.to;
    if (to) {
      for (let i = from; i <= to; i++) {
        file.lines[i].action = action;
      }
    }
    if (!to && action === ActionType.CHANGE) {
      file.lines[from].action = action;
    }
  }
}
