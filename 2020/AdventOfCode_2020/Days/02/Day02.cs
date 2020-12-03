using System;
using System.IO;
using System.Text.RegularExpressions;
using AdventOfCode_2020.Functions;

namespace AdventOfCode_2020.Days
{
    public static class Day02 {
      public static int ValidPasswordCount() {
        DateTime start = DateTime.Now;

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

        DateTime end = DateTime.Now;

        Console.WriteLine("Process completed in: {0}", end - start);

        return count;
      }

      public static int ValidPasswordCountRegex() {
        DateTime start = DateTime.Now;

        Regex regex = new Regex(@"(?<minimum>\d+)-(?<maximum>\d+) (?<key>\w{1}): (?<password>\w+)");
        int count = 0;
        StreamReader data = new StreamReader(@"AdventOfCode_2020/Days/02/input.txt");
        string line;

        while((line = data.ReadLine()) != null) {
          var results = regex.Matches(line);
          int min, max;
          char key;
          string password;
          foreach(Match match in results) {
            var groups = match.Groups;
            // Console.WriteLine(groups["key"].Value);
            min = int.Parse(groups["minimum"].Value);
            max = int.Parse(groups["maximum"].Value);
            key = char.Parse(groups["key"].Value);
            password = groups["password"].Value;

            if (Password.ValidatePasswordFuture(min, max, key, password)) {
              count++;
            }
          }
        }

        DateTime end = DateTime.Now;

        Console.WriteLine("Process completed in: {0}", end - start);

        return count;
      }
    }
}