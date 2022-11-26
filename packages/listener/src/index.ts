type EventName = string | symbol;

type Exec<T> = (option: T) => void;

type Task<T> = {
  once?: boolean;
  exec: Exec<T>;
};

type OnOptions = {
  /** 是否单次监听 */
  once?: boolean;
};

const isExist = <T>(tasks: Task<T>[] | undefined): boolean =>
  typeof tasks !== 'undefined';

class Listener {
  /** 任务存储 */
  private taskMap: Map<EventName, Task<any>[]> = new Map();

  /** 是否已经监听 */
  private isListenning = <T>(key: EventName, exec: Exec<T>) => {
    const { taskMap } = this;
    const tasks = taskMap.get(key);

    return isExist(tasks) && !!tasks?.find(item => item.exec === exec);
  };

  /** 监听 */
  public on = <T>(
    key: EventName,
    exec: Exec<T>,
    { once }: OnOptions = {}
  ): void => {
    const { taskMap } = this;
    const tasks = taskMap.get(key);

    // 已经监听
    if (this.isListenning(key, exec)) {
      return;
    }
    const task = {
      once,
      exec,
    };
    if (isExist(tasks)) {
      tasks?.push(task);
      return;
    }
    taskMap.set(key, [task]);
  };

  /** 取消监听 */
  public off = <T>(key: EventName, exec: Exec<T>): void => {
    const { taskMap } = this;
    const tasks = taskMap.get(key);

    // 尚未监听
    if (!isExist(tasks)) return;

    const index = tasks?.findIndex(task => task.exec === exec) as number;

    if (index !== -1) {
      tasks?.splice(index, 1);
    }
  };

  /** 触发监听 */
  public emit = <T>(key: EventName, param?: T): void => {
    const { taskMap } = this;
    const tasks = taskMap.get(key) as Task<any>[];
    // 尚未监听
    if (!isExist(tasks)) return;
    // 移除监听任务下标序号列表
    const deleteIndexs: number[] = [];

    tasks.forEach((task, index) => {
      if (task.once) {
        deleteIndexs.push(index);
      }
      task.exec(param);
    });
    // 移除监听
    for (let len = deleteIndexs?.length as number; len > 0; len -= 1) {
      tasks.splice(deleteIndexs[len - 1], 1);
    }
  };

  /** 清空所有监听 */
  public clear = () => {
    this.taskMap.clear();
  };

  public getTask = <T>(name: EventName): Task<T>[] | undefined =>
    this.taskMap.get(name);

  /** 销毁, 清空所有监听 */
  public destroy = (): void => {
    this.clear();
  };
}

export { Listener };
