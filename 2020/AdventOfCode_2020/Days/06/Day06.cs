using System;
using System.Collections.Generic;
using System.IO;

namespace AdventOfCode_2020.Days
{
  public static class Day06 {
    public static List<string> ReadQuestions() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/06/input.txt");
      string line;
      List<string> groups = new List<string>();
      groups.Add("");

      while((line = reader.ReadLine()) != null) {
        if (String.IsNullOrWhiteSpace(line)) {
          Console.WriteLine(groups[groups.Count - 1]);
          groups.Add("");
        } else {
          foreach(char c in line) {
            if (!groups[groups.Count - 1].Contains(c)) groups[groups.Count - 1] += c;
          }
        }
      }

      return groups;
    }

    public static List<string> ReadQuestionsEx() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/06/input.txt");
      string line;
      List<string> groups = new List<string>();
      groups.Add("");
      bool newGroup = true;

      while((line = reader.ReadLine()) != null) {
        if (String.IsNullOrWhiteSpace(line)) {
          groups.Add("");
          newGroup = true;
        } else if (newGroup) {
          groups[groups.Count - 1] = line;
          newGroup = false;
        } else { // !emptyLine and !newGroup
          string union = "";
          foreach(char c in line) {
            if (groups[groups.Count - 1].Contains(c)) union += c;
          }
          groups[groups.Count - 1] = union;
        }
      }

      return groups;
    }
    
    public static int SumQuestions(List<string> groups) {
      int count = 0;

      foreach (string s in groups) count += s.Length;

      return count;
    }
  }
}