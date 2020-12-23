using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AdventOfCode_2020.Days {
  public static class Day21 {
    public static int AllergenFreeIngredientCount() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/21/testInput.txt");
      String line;
      Dictionary<string, int> ingredientCount = new Dictionary<string, int>();
      Dictionary<string, HashSet<string>> potentialAllergens = new Dictionary<string, HashSet<string>>();
      List<string> hasAllergen = new List<string>();

      while((line = reader.ReadLine()) != null) {
        // Parse Input
        line = line.Replace(",", "").Replace("(", "").Replace(")", "");
        var words = line.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var breakIndex = Array.IndexOf(words, "contains");
        var allergenTypes = words.Subarray(breakIndex + 1, words.Length);
        // Console.WriteLine("{0}", String.Join(",", allergenTypes));
        for(int i = 0; i < breakIndex; i++) {
          if (ingredientCount.ContainsKey(words[i])) {
            ingredientCount[words[i]]++;
          } else {
            ingredientCount.Add(words[i], 1);
          }

          if (!potentialAllergens.ContainsKey(words[i])) {
            potentialAllergens.Add(words[i], allergenTypes.ToHashSet());
          } else {
            potentialAllergens[words[i]].UnionWith(allergenTypes);
          }
        }
      }

      // Make a list of ingredients
      // Extensions.PrintDictionary(ingredientCount);
      Extensions.PrintDictionaryEnumerableValue(potentialAllergens);

      // Count Ingredients not in allergen list
      int count = 0;
      foreach(KeyValuePair<string, int> pair in ingredientCount) {
        if (!hasAllergen.Exists(a => a == pair.Key)) count += pair.Value;
      }

      return count;
    }
  }
}