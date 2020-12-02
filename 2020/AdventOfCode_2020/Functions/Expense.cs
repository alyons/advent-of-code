using System.Collections.Generic;

namespace AdventOfCode_2020.Functions {
  public static class Expense {
      public static int FindSumSetFuture(List<int> expenses) {
        for(int i = 0; i < expenses.Count; i++) {
          int testValue = 2020 - expenses[i];
          if (expenses.IndexOf(testValue) > -1) {
            return testValue * expenses[i];
          }
        }

        return 0;
      }

      public static int FindSumSetZio(List<int> expenses) {
        for(int i = 0; i < expenses.Count - 1; i++) {
          for(int j = i + 1; j < expenses.Count; j++) {
            if (expenses[i] + expenses[j] >= 2020) continue;
            int testValue = 2020 - expenses[i] - expenses[j];
            if (expenses.IndexOf(testValue) > -1) {
              return testValue * expenses[i] * expenses[j];
            }
          }
        }

        return 0;
      }
  }
}