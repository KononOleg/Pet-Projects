import { Player } from "../registration/Player/Player";

interface Data {
  name?: string;
  email?: string;
  score?: number;
  avatar?: string;
}

export class Database {
  public static db: IDBDatabase;

  private static instance: Database;

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  init = (): void => {
    const dbReq = indexedDB.open("KononOleg", 1);

    dbReq.onupgradeneeded = () => {
      Database.db = dbReq.result;
      const notes = Database.db.createObjectStore("notes", {
        autoIncrement: true,
      });
      notes.createIndex("name", "name");
      notes.createIndex("email", "email");
      notes.createIndex("score", "score");
      notes.createIndex("avatar", "avatar");
    };
    dbReq.onsuccess = () => {
      Database.db = dbReq.result;
    };
  };

  add = (): void => {
    const transaction = Database.db.transaction(["notes"], "readwrite");
    const store = transaction.objectStore("notes");
    const newRecord: Data = {
      name: `${Player.FirstName} ${Player.LastName}`,
      email: Player.Email,
      score: Player.Score,
      avatar: Player.Avatar,
    };
    store.add(newRecord);
  };

  show = (): Promise<Data[]> => {
    const transaction = Database.db.transaction("notes", "readonly");
    const store = transaction.objectStore("notes");
    const res = store.index("score").openCursor(null, "prev");
    const data: Data[] = [];
    let i = 10;

    return new Promise((resolve) => {
      res.onsuccess = () => {
        const cursor = res.result;
        if (cursor && i !== 0) {
          data.push(cursor.value);
          i--;
          cursor.continue();
        } else {
          resolve(data);
        }
      };
    });
  };
}
