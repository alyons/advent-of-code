using System;
using System.Collections.Generic;
using System.IO;

namespace AdventOfCode_2020.Days {
  public static class Day09 {
    public static long FindInvalidNumber(List<long> data, int preamble) {
      for(int i = preamble; i < data.Count; i++) {
        List<long> subset = data.GetRange(i - preamble, preamble);
        bool foundPair = false;
        for(int j = 0; j < subset.Count; j++) {
          if (subset.Exists(x => x + subset[j] == data[i] && x != subset[j])) foundPair = true;
        }

        if (!foundPair) return data[i];
      }

      return -1;
    }

    public static long FindEncryptionWeakness(List<long> data, long breakPoint) {
      for(int i = 0; i < data.Count; i++) {
        var sum = data[i];
        for(int j = i + 1; j < data.Count; j++) {
          sum += data[j];
          if (sum == breakPoint) {
            var set = data.GetRange(i, j - i + 1);
            set.Sort();

            return set[0] + set[set.Count - 1];
          }
          if (sum > breakPoint) break;
        }
      }

      return -1;
    }

    public static long ValidateXMASInput() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/09/input.txt");
      string line;
      List<long> data = new List<long>();

      while((line = reader.ReadLine()) != null) {
        data.Add(long.Parse(line));
      }

      return FindInvalidNumber(data, 25);
    }

    public static long BreakXMASInput() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/09/input.txt");
      string line;
      List<long> data = new List<long>();

      while((line = reader.ReadLine()) != null) {
        data.Add(long.Parse(line));
      }

      var breakPoint = FindInvalidNumber(data, 25);
      return FindEncryptionWeakness(data, breakPoint);
    }
  }
}