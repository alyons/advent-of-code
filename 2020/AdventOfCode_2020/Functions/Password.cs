using System;

namespace AdventOfCode_2020.Functions {

  public static class Password {
    public static bool ValidatePassword(int min, int max, char check, string password) {
      int index = 0;
      int count = 0;

      while(password.IndexOf(check, index) > -1) {
        index = password.IndexOf(check, index) + 1;
        count++;
      }

      Console.WriteLine("{0}: {1}", password, count);

      return (count <= max && count >= min);
    }

    public static bool ValidatePasswordFuture(int firstIndex, int secondIndex, char check, string password) {
      bool firstMatch = password[firstIndex - 1].Equals(check);
      bool secondMatch = password[secondIndex - 1].Equals(check);

      return firstMatch ^ secondMatch;
    }
  }

}
