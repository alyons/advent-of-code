using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace AdventOfCode_2020.Functions {
  public static class Passport {
    public static bool ValidatePassport(string passport) {

      if (passport.IndexOf("byr") == -1) return false;
      if (passport.IndexOf("iyr") == -1) return false;
      if (passport.IndexOf("eyr") == -1) return false;
      if (passport.IndexOf("hgt") == -1) return false;
      if (passport.IndexOf("hcl") == -1) return false;
      if (passport.IndexOf("ecl") == -1) return false;
      if (passport.IndexOf("pid") == -1) return false;
      // if (passport.IndexOf("cid") == -1) return false;

      var pairs = passport.Split(' ', StringSplitOptions.RemoveEmptyEntries);

      foreach(string pair in pairs) {
        if (pair.IndexOf("byr") > -1) { if (!ValidateBirthYear(pair)) return false; }
        if (pair.IndexOf("iyr") > -1) { if (!ValidateIssueYear(pair)) return false; }
        if (pair.IndexOf("eyr") > -1) { if (!ValidateExpirationYear(pair)) return false; }
        if (pair.IndexOf("hgt") > -1) { if (!ValidateHeight(pair)) return false; }
        if (pair.IndexOf("hcl") > -1) { if (!ValidateHairColor(pair)) return false; }
        if (pair.IndexOf("ecl") > -1) { if (!ValidateEyeColor(pair)) return false; }
        if (pair.IndexOf("pid") > -1) { if (!ValidateId(pair)) return false; }
        // if (pair.IndexOf("cid") > -1) return false;
      }

      return true;
    }

    public static bool ValidateBirthYear(string pair) {
      var value = pair.Split(':')[1];
      
      try {
        var year = int.Parse(value);
        return year >= 1920 && year <= 2002;
      } catch {
        return false;
      }
    }

    public static bool ValidateIssueYear(string pair) {
      var value = pair.Split(':')[1];

      try {
        var year = int.Parse(value);
        return year >= 2010 && year <= 2020;
      } catch {
        return false;
      }
    }

    public static bool ValidateExpirationYear(string pair) {
      var value = pair.Split(':')[1];      

      try {
        var year = int.Parse(value);
        return year >= 2020 && year <= 2030;
      } catch {
        return false;
      }
    }

    public static bool ValidateHeight(string pair) {
      var value = pair.Split(':')[1];

      if (value.IndexOf("cm") == -1 && value.IndexOf("in") == -1) {
        return false;
      } else {
        try {
          var unit = value.Substring(value.Length - 2);
          var count = int.Parse(value.Substring(0, value.Length - 2));
          if (unit == "cm") {
            return count >= 150 && count <= 193;
          } else {
            return count >= 59 && count <= 76;
          }
        } catch {
          return false;
        }
      }
    }

    static Regex hairColorRegex = new Regex(@"#[a-f0-9]{6}");
    public static bool ValidateHairColor(string pair) {
      var value = pair.Split(':')[1];
      return hairColorRegex.IsMatch(value);
    }

    static List<string> validEyeColors = new List<string>() { "amb", "blu", "brn", "gry", "grn", "hzl", "oth" };
    public static bool ValidateEyeColor(string pair) {
      var value = pair.Split(':')[1];
      // if (validEyeColors.IndexOf(value) == -1) Console.WriteLine("{0} is not a valid eye color.", value);
      return validEyeColors.IndexOf(value) > -1;
    }

    static Regex idRegex = new Regex(@"[0-9]{9}");
    public static bool ValidateId(string pair) {
      var value = pair.Split(':')[1];
      if (value.Length > 9) return false;
      if (idRegex.IsMatch(value)) Console.WriteLine("{0} is a valid id.", value);
      return idRegex.IsMatch(value);
    }
  }
}