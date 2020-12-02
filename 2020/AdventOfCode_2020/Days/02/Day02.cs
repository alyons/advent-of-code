using System.IO;
using AdventOfCode_2020.Functions;

namespace AdventOfCode_2020.Days
{
    public static class Day02 {
      public static int ValidPasswordCount() {
        int count = 0;
        StreamReader data = new StreamReader(@"AdventOfCode_2020/Days/02/input.txt");
        string line;

        while((line = data.ReadLine()) != null) {
          string[] parts = line.Split(' ');

          // Part one split into numbers
          string[] limits = parts[0].Split('-');
          int min = int.Parse(limits[0]);
          int max = int.Parse(limits[1]);
          // Part two just take first char
          // Part three is the password

          if (Password.ValidatePasswordFuture(min, max, parts[1][0], parts[2])) {
            count++;
          }
        }

        return count;
      }
    }
}