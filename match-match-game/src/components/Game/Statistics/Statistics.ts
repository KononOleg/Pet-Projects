export class Statistics {
  public static numberCompar = 0;

  public static numberErrorCompar = 0;

  public static Time = 0;

  public static getScore(): number {
    const score = (Statistics.numberCompar - Statistics.numberErrorCompar) * 100 - Statistics.Time * 10;
    return score > 0 ? score : 0;
  }

  public static resetStatistics(): void {
    Statistics.numberCompar = 0;
    Statistics.numberErrorCompar = 0;
    Statistics.Time = 0;
  }
}
