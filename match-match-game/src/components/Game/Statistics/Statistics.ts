export class Statistics {
  public static numberCompar: number = 0;
  public static numberErrorCompar: number = 0;
  public static Time: number = 0;

  public static getScore() {
    let score = (Statistics.numberCompar - Statistics.numberErrorCompar) * 100 - Statistics.Time * 10;
    return score > 0 ? score : 0;
  }

  public static resetStatistics() {
    Statistics.numberCompar = 0;
    Statistics.numberErrorCompar = 0;
    Statistics.Time = 0;
  }
}
