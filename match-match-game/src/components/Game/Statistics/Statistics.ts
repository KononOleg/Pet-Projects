export class Statistics {
  public static numberCompar: number = 0;
  public static numberErrorCompar: number = 0;
  public static Time: number = 0;
  private static Score: number;

  public static setScore() {
    this.Score =
      (Statistics.numberCompar - Statistics.numberErrorCompar) * 100 -
      Statistics.Time / 10;
  }

  public static resetStatistics() {
    Statistics.numberCompar = 0;
    Statistics.numberErrorCompar = 0;
    Statistics.Time = 0;
  }
}
