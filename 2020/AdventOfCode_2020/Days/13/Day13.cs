using System;
using System.Collections.Generic;
using System.IO;

namespace AdventOfCode_2020.Days {
  public static class Day13 {
    public static int BusDepartureAlpha() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/13/input.txt");
      int dockArrival = int.Parse(reader.ReadLine());
      var buses = reader.ReadLine().Split(',');
      Dictionary<int, int> busTimes = new Dictionary<int, int>();
      var properDepartureTime = int.MaxValue;

      foreach(string bus in buses) {
        try {
          // validBuses.Add(int.Parse(bus));
          var busId = int.Parse(bus);
          var timeSlot = ((dockArrival / busId) + 1) * busId;
          busTimes.Add(timeSlot, busId);

          if (timeSlot < properDepartureTime && timeSlot > dockArrival) properDepartureTime = timeSlot;
        } catch {
          // Do Nothing!
          // Console.WriteLine("Unable to parse: {0}", bus);
        }
      }

      foreach(KeyValuePair<int, int> pair in busTimes) {
        Console.WriteLine("Bus {1} will depart at {0}.", pair.Key, pair.Value);
      }

      return (properDepartureTime - dockArrival) * busTimes[properDepartureTime];
    }

    public static ulong GetTheGoldCoin() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/13/input.txt");
      reader.ReadLine();
      var busIds = reader.ReadLine().Split(',');
      List<ulong> buses = new List<ulong>();
      ulong a = 0, b = 0, c = 0, d = 0, result = 0;
      for(ulong i = 0; i < (ulong)busIds.Length; i++) {
        try {
          ulong value = ulong.Parse(busIds[i]);
          buses.Add(value);
          if (a == 0) {
            a = value;
            b = i;
          } else if (c == 0) {
            c = value;
            d = i;
          }
        } catch {
          buses.Add(0);
        }
      }

      result = ModuloMatch(a, b, c, d);
      Console.WriteLine(result);
      
      for(ulong i = d + 1; i < (ulong)buses.Count; i++) {
        if (buses[(int)i] == 0) continue;
        Console.WriteLine("Bus Id: {0} Offset: {1}", buses[(int)i], i);

        a = a * c;
        b = result;
        c = buses[(int)i];
        d = i;
        result = ModuloMatch(a, b, c, d);
      }

      return result;
    }

    static ulong ModuloMatch(ulong a, ulong b, ulong c, ulong d) {
      // Console.WriteLine("{0} * ? + {1} == {2} * ? + {3}", a, b, c, d);
      var result = a + b;

      while(((result) % a != b || (result + d) % c != 0)) {
        // Console.WriteLine("Checking {0}: {1} % {2} [{3}]", result, (result + d), c, (result + d) % c);
        result += a;
      }

      return result;
    }
  }
}
