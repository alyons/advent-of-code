using System.Collections.Generic;
using System.IO;
using AdventOfCode_2020.Functions;

namespace AdventOfCode_2020.Days {
  public static class Day01 {
    public static int CalculateDayAnswer() {
      StreamReader data = new StreamReader(@"AdventOfCode_2020/Days/01/input.txt");
      List<int> expenses = new List<int>();
      string line;

      while((line = data.ReadLine()) != null) {
        expenses.Add(int.Parse(line));
      }

      return Expense.FindSumSetFuture(expenses);
    }
  }
}