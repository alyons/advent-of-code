using System;
using System.Linq;
using System.IO;
using System.Text.RegularExpressions;

namespace AdventOfCode_2020.Days {
  public static class Day18 {
    public static long CalculateSumOfEquations() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/18/input.txt");
      string line;
      long total = 0;

      // Part 1
      // while((line = reader.ReadLine()) != null) {
      //   if (!line.Contains('#')) total += CalculateEquation(line);
      // }

      // Part 2
      while((line = reader.ReadLine()) != null) {
        if (!line.Contains('#')) total += AdvancedMath(line);
      }

      return total;
    }

    static long CalculateEquation(string equation) {
      var parts = equation.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

      long output = -1;
      var op = "?";
      long value = 0;
      var i = 0;

      while(i < parts.Length) {
        if (parts[i] == "+" || parts[i] == "*") {
          op = parts[i];
          i++;
        } else {
          if (parts[i].Contains('(')) {
            int pCount = parts[i].Count(c => c == '(');
            int j = i + 1;
            // Console.WriteLine("P Count: {0} [{1}]", pCount, parts[i]);
            while(j < parts.Length && pCount > 0) {
              pCount += parts[j].Count(c => c == '(');
              pCount -= parts[j].Count(c => c == ')');
              // Console.WriteLine("P Count: {0} [{1}]", pCount, parts[j]);
              j++;
            }

            var substring = String.Join(' ', parts.Subarray(i, j));
            substring = substring.Substring(1, substring.Length - 2);
            Console.WriteLine("Calculating subset: [{0}]", substring);
            value = CalculateEquation(substring);

            i = j;
          } else {
            value = long.Parse(parts[i]);
            i++;
          }

          Console.WriteLine("{0} {1} {2}", output, op, value);

          if (output == -1) {
            output = value;
          } else {
            switch(op) {
              case "+":
                output += value;
                break;
              case "*":
                output *= value;
                break;
            }
          }
        }
      }

      Console.WriteLine("{0} = {1}", String.Join(' ', parts), output);

      return output;
    }

    static long AdvancedMath(string equation) {
      var parts = equation.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList();

      // Recussion Check
      while(parts.Count > 1) {
        // Check for Parentheses First
        if (parts.Exists(p => p.Contains('('))) {
          var i = parts.FindIndex(p => p.Contains('('));
          int pCount = parts[i].Count(c => c == '(');
          var j = i + 1;
          while(j < parts.Count && pCount > 0) {
            pCount += parts[j].Count(c => c == '(');
            pCount -= parts[j].Count(c => c == ')');
            j++;
          }

          var substring = String.Join(' ', parts.GetRange(i, j - i));
          substring = substring.Substring(1, substring.Length - 2);
          var value = AdvancedMath(substring);

          do {
            j--;
            parts.RemoveAt(j);
          } while(j > i + 1);
          parts[i] = value.ToString();
          // Do parenthesis logic here
        } else if (parts.IndexOf("+") > -1) {
          var index = parts.IndexOf("+");
          var tempValue = long.Parse(parts[index - 1]) + long.Parse(parts[index + 1]);
          parts.RemoveAt(index + 1);
          parts.RemoveAt(index);
          parts[index - 1] = tempValue.ToString();
        } else { // This should be multiplication left
          var index = parts.IndexOf("*");
          var tempValue = long.Parse(parts[index - 1]) * long.Parse(parts[index + 1]);
          parts.RemoveAt(index + 1);
          parts.RemoveAt(index);
          parts[index - 1] = tempValue.ToString();
        }
      }

      return long.Parse(parts[0]);
    }
  }
}