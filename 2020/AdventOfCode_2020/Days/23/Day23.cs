using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode_2020.Days {
  public static class Day23 {
    public static int CupChallengeScore() {
      var cups = "318946572";
      var index = 0;
      var maxMoves = 100;

      for(int m = 0; m < maxMoves; m++) {
        var value = int.Parse($"{cups[index]}");
        var subset = cups.Substring(index + 1, 3);
        cups = cups.Remove(index + 1, 3);
        var destination = value - 1;
        var destIndex = cups.IndexOf($"{destination}");
        while(destIndex == -1) {
          destination -= 1;
          if (destination < 1) destination = 9;
          destIndex = cups.IndexOf($"{destination}");
        }
        cups = cups.Insert(destIndex + 1, subset);
        // index++;
        // if (index >= cups.Length) index = 0;
        cups = CircleString(cups);
        Console.WriteLine("Cups: {0}, Next Index: {1}", cups, index);
      }

      Console.WriteLine(cups);

      return 0;
    }

    static string CircleString(string value) {
      var singleItem = value.Substring(0, 1);
      var subString = value.Remove(0, 1);
      return subString + singleItem;
    }
  }
}