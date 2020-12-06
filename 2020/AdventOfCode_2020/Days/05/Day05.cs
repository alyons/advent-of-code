using System;
using System.Collections.Generic;
using System.IO;

namespace AdventOfCode_2020.Days {
  public static class Day05 {
    public static int LargestBoardingPass() {
      int highestId = int.MinValue;

      StreamReader data = new StreamReader(@"AdventOfCode_2020/Days/05/input.txt");
      string line;
      while((line = data.ReadLine()) != null) {
        if (!String.IsNullOrWhiteSpace(line)) {
          var rowString = line.Substring(0, 7).Replace("F", "0").Replace("B", "1");
          var colString = line.Substring(7).Replace("L", "0").Replace("R", "1");

          var boardingId = Convert.ToInt32(rowString, 2) * 8 + Convert.ToInt32(colString, 2);

          Console.WriteLine("{0}: {1}", line, boardingId);
          if (boardingId > highestId) highestId = boardingId;
        }
      }

      return highestId;
    }

    public static int FindMySeat() {
      int mySeat = int.MinValue;
      List<int> seats = new List<int>();

      StreamReader data = new StreamReader(@"AdventOfCode_2020/Days/05/input.txt");
      string line;
      while((line = data.ReadLine()) != null) {
        if (!String.IsNullOrWhiteSpace(line)) {
          var rowString = line.Substring(0, 7).Replace("F", "0").Replace("B", "1");
          var colString = line.Substring(7).Replace("L", "0").Replace("R", "1");

          var boardingId = Convert.ToInt32(rowString, 2) * 8 + Convert.ToInt32(colString, 2);
          seats.Add(boardingId);
        }
      }

      seats.Sort();

      for(var i = 0; i < seats.Count - 1; i++) {
        if (seats[i] + 2 == seats[i + 1]) {
          mySeat = seats[i] + 1;
          break;
        }
      }

      return mySeat;
    }
  }
}