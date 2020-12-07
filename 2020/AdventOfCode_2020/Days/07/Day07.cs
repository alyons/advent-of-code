using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace AdventOfCode_2020.Days {
  
  public class Bag {
    public string Color { get; protected set; }
    public Dictionary<string, int> Slots { get; protected set; }

    public Bag() {
      Color = "invisible";
      Slots = new Dictionary<string, int>();
    }

    public Bag(string dataString) {
      string[] parts = dataString.Split("bags contain", StringSplitOptions.TrimEntries);

      // Part 0 - Current Bag Color
      Color = parts[0];

      // Part 1 - Slots
      Slots = new Dictionary<string, int>();
      if (!parts[1].Equals("no other bags.")) {
        string[] slotData = parts[1].Split(",");
        foreach(string slotDatum in slotData) {
          var parse0 = slotDatum.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
          var parse1 = int.Parse(parse0[0]);
          var parse2 = parse0[1] + " " + parse0[2];
          Slots.Add(parse2, parse1);
        }
      }
    }

    public override string ToString() {
      StringBuilder sb = new StringBuilder();

      sb.Append(Color + " bag: ");
      if (Slots.Count > 0) {
        foreach(KeyValuePair<string, int> slot in Slots) {
          sb.Append(slot.Key + " " + slot.Value + " ");
        }
      } else {
        sb.Append("No Slots.");
      }

      return sb.ToString();
    }
  }
  
  public static class Day07 {
    public static int BagsWhichCanHoldGold() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/07/input.txt");
      string line;

      List<Bag> bags = new List<Bag>();

      while ((line = reader.ReadLine()) != null) {
        if (!String.IsNullOrWhiteSpace(line)) {
          bags.Add(new Bag(line));
          Console.WriteLine(bags[bags.Count - 1].ToString());
        }
      }

      List<string> bagsToCheckFor = new List<string>() { "shiny gold" };
      List<string> nestingBags = new List<string>();

      do {
        var checkColor = bagsToCheckFor[0];

        foreach(Bag bag in bags) {
          if (bag.Slots.ContainsKey(checkColor)) {
            if (nestingBags.IndexOf(bag.Color) == -1) {
              nestingBags.Add(bag.Color);
              bagsToCheckFor.Add(bag.Color);
            }
          }
        }

        bagsToCheckFor.RemoveAt(0);
      } while(bagsToCheckFor.Count > 0);

      return nestingBags.Count;
    }
  
    public static int BagsWhichGoldHolds() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/07/input.txt");
      string line;

      List<Bag> bags = new List<Bag>();

      while ((line = reader.ReadLine()) != null) {
        if (!String.IsNullOrWhiteSpace(line)) {
          bags.Add(new Bag(line));
          Console.WriteLine(bags[bags.Count - 1].ToString());
        }
      }

      return BagCount("shiny gold", bags);
    }
  
    public static int BagCount(string key, List<Bag> map) {
      int count = 0;

      foreach(KeyValuePair<string, int> pair in map.Find(b => b.Color == key).Slots) {
        count += pair.Value;
        count += pair.Value * BagCount(pair.Key, map);
      }

      return count;
    }
  }
}