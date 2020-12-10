using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;


namespace AdventOfCode_2020.Days {
  public static class Day10 {
    public static int AdapterNumber() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/10/input.txt");
      string line;
      List<int> adapters = new List<int>(){ 0 };
      while((line = reader.ReadLine()) != null) {
        adapters.Add(int.Parse(line));
      }

      var oneDiffCount = 0;
      var twoDiffCount = 0;
      var threeDiffCount = 1; 

      adapters.Sort();
      for(int i = 0; i < adapters.Count - 1; i++) {
        switch(adapters[i + 1] - adapters[i]) {
          case 3:
            threeDiffCount++;
            break;
          case 2:
            twoDiffCount++;
            break;
          case 1:
            oneDiffCount++;
            break;
          default:
            // Do Nothing
            break;
        }
      }

      // Console.WriteLine("Numbers: {0}", PrintList(adapters));

      Console.WriteLine("One Difference Count: {0}\nThree Difference Count: {1}", oneDiffCount, threeDiffCount);

      return oneDiffCount * threeDiffCount;
    }

    public static string PrintList<T>(List<T> list) {
      string output = "[";

      for(int i = 0; i < list.Count; i++) {
        output += list[i].ToString();
        if (i < list.Count - 1) output += ", ";
      }

      return output += "]";
    }

    public static long NumberOfConfigurations() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/10/input.txt");
      string line;
      List<int> adapters = new List<int>(){ 0 };
      while((line = reader.ReadLine()) != null) {
        adapters.Add(int.Parse(line));
      }
      adapters.Sort();

      long configurations = 1;
      List<List<int>> subsets = new List<List<int>>();

      for(int i = 0; i < adapters.Count - 1; i++) {
        var seqEnd = i + 1;
        while(adapters[seqEnd] - adapters[i] < 3) {
          if (seqEnd == adapters.Count - 1) break;

          if (adapters[seqEnd + 1] - adapters[i] <= 3) {
            seqEnd++;
          } else {
            break;
          }
        }

        var subset = adapters.GetRange(i, seqEnd - i + 1);

        if (subsets.Count == 0 || !subset.All(x => subsets[subsets.Count - 1].Any(y => y == x))) {
          Console.WriteLine("{0} => {1}", PrintList(subset), Math.Pow(2, subset.Count - 2));
          // configurations *= (int)Math.Pow(2, subset.Count - 2);
          subsets.Add(subset);
        }
      }

      // Now I have a list of subsets, I can calculate if subset shares anything or if it is stand alone and do math based on that:
      for(int j = 0; j < subsets.Count; j++) {
        if (j == subsets.Count - 1) {
          configurations *= (int)Math.Pow(2, subsets[j].Count - 2);
        } else {
          if (subsets[j].Intersect(subsets[j + 1]).Count() == 3) {
            configurations *= 7;
            j++;
          } else {
            configurations *= (long)Math.Pow(2, subsets[j].Count - 2);
          }
        }
      }

      return configurations;
    }
  }
}