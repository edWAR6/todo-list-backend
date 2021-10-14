interface IDatabase {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export {
  IDatabase
};