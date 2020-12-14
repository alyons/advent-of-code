using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace AdventOfCode_2020.Days {
  public static class Day14 {
    public static long CalculateSum() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/14/input.txt");
      string line;
      string mask = "".PadLeft(36, 'X');
      Dictionary<int, string> memory = new Dictionary<int, string>();
      Regex regex = new Regex(@"mem\[(?<index>\d+)\] = (?<value>\d+)");

      while((line = reader.ReadLine()) != null) {
        // Set the mask
        if (line.Contains("mask")) {
          mask = line.Split('=', StringSplitOptions.TrimEntries)[1];
          // Console.WriteLine("Set new mask: {0}", mask);
        } else {
          // Console.WriteLine(line);
          var match = regex.Match(line);
          int index;
          long value;
          var groups = match.Groups;
          index = int.Parse(groups["index"].Value);
          value = long.Parse(groups["value"].Value);
          string toWrite = ApplyMask(mask, Convert.ToString(value, 2).PadLeft(36, '0'));

          // Console.WriteLine("Set Memory[{0}]: {1}", index, toWrite);

          if (memory.ContainsKey(index)) {
            memory[index] = toWrite;
          } else {
            memory.Add(index, toWrite);
          }
        }
      }

      // Sum all of the values
      long output = 0;

      foreach(string value in memory.Values) {
        output += Convert.ToInt64(value, 2);
      }

      return output;
    }

    static string ApplyMask(string mask, string value) {
      var output = value.ToCharArray();

      for(int i = 0; i < mask.Length; i++) {
        if (mask[i] != 'X') output[i] = mask[i]; 
      }

      return new string(output);
    }

    public static long CalculateSumV2() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/14/input.txt");
      string line;
      string mask = "".PadLeft(36, 'X');
      Dictionary<long, string> memory = new Dictionary<long, string>();
      Regex regex = new Regex(@"mem\[(?<index>\d+)\] = (?<value>\d+)");

      while((line = reader.ReadLine()) != null) {
        // Set the mask
        if (line.Contains("mask")) {
          mask = line.Split('=', StringSplitOptions.TrimEntries)[1];
          // Console.WriteLine("Set new mask: {0}", mask);
        } else {
          // Console.WriteLine(line);
          var match = regex.Match(line);
          long index;
          long value;
          var groups = match.Groups;
          index = long.Parse(groups["index"].Value);
          value = long.Parse(groups["value"].Value);

          string valueString = Convert.ToString(value, 2).PadLeft(36, '0');
          AddValuesToDictonary(ref memory, mask, index, valueString);
        }
      }

      // Sum all of the values
      long output = 0;

      foreach(string value in memory.Values) {
        output += Convert.ToInt64(value, 2);
      }

      return output;
    }

    static string ApplyMaskV2(string mask, string value) {
      var output = value.ToCharArray();

      for(int i = 0; i < mask.Length; i++) {
        switch(mask[i]) {
          case '1':
          case 'X':
            // In both cases, overwrite the value with what is in the mask
            output[i] = mask[i];
            break;
          default: // case '0':
            // Do Nothing
            break;
        }
      }

      return new string(output);
    }

    static void AddValuesToDictonary(ref Dictionary<long, string> memory, string mask, long address, string value) {
      Queue<string> addressesToAdjust = new Queue<string>();
      List<string> finalAddresses = new List<string>();
      addressesToAdjust.Enqueue(ApplyMaskV2(mask, Convert.ToString(address, 2).PadLeft(36, '0')));
      var regex = new Regex(Regex.Escape("X"));

      while(addressesToAdjust.Count > 0) {
        var temp = addressesToAdjust.Dequeue();
        var temp0 = regex.Replace(temp, "0", 1);
        var temp1 = regex.Replace(temp, "1", 1);

        if (temp0.Contains('X')) { addressesToAdjust.Enqueue(temp0); } else { finalAddresses.Add(temp0); }
        if (temp1.Contains('X')) { addressesToAdjust.Enqueue(temp1); } else { finalAddresses.Add(temp1); }
      }
      

      finalAddresses.Sort();
      for(int i = 0; i < finalAddresses.Count; i++) {
        var add = Convert.ToInt64(finalAddresses[i], 2);

        if (memory.ContainsKey(add)) { memory[add] = value; } else { memory.Add(add, value); }
      }
    }
  }
}