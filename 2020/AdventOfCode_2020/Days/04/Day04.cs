using System;
using System.Collections.Generic;
using System.IO;

using AdventOfCode_2020.Functions;

namespace AdventOfCode_2020.Days {
  public static class Day04 {
    public static int ValidPassports() {
      int count = 0;

      // Build Passport Data Sets
      List<string> passports = new List<string>();
      string line;
      string passportData = "";
      StreamReader stream = new StreamReader(@"AdventOfCode_2020/Days/04/input.txt");
      while((line = stream.ReadLine()) != null) {
        if (String.IsNullOrWhiteSpace(line)) {
          passports.Add(passportData);
          passportData = "";
        } else {
          passportData += line + " ";
        }
      }

      if (!String.IsNullOrWhiteSpace(passportData)) passports.Add(passportData);

      // Test Each passport
      foreach(string pass in passports) {
        if (Passport.ValidatePassport(pass)) {
          // Console.WriteLine(pass);
          count++;
        } else {
          // Console.WriteLine(pass);
        }
      }


      // 142 was too low -> First pass
      // 182 vas too high -> Remove check for all fields
      // 161 was too high -> Fix missing Eye Color

      return count;
    }
  }
}