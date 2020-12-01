using System.Collections.Generic;

namespace AdventOfCode_2020.Functions {
  public static class Expense {
    public static int FindSumSetProduct(int[] expenses) {
      int output = 0;

      int firstIndex = 0;
      int secondIndex = 1;

      while(firstIndex < expenses.Length - 1) {

        while(secondIndex < expenses.Length) {
          if (expenses[firstIndex] + expenses[secondIndex] == 2020) {
            return expenses[firstIndex] * expenses[secondIndex];
          }

          secondIndex++;
        }

        firstIndex++;
        secondIndex = firstIndex + 1;
      }

      return output;
    }

      public static int FindSumSetFuture(List<int> expenses) {
        for(int i = 0; i < expenses.Count; i++) {
          int testValue = 2020 - expenses[i];
          if (expenses.IndexOf(testValue) > -1) {
            return testValue * expenses[i];
          }
        }

        return 0;
      }
  }
}