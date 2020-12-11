using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AdventOfCode_2020.Days {
  public static class Day11 {
    public static int FindOccupiedSeats() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/11/testInput.txt");
      var map = reader.ReadToEnd();
      Dictionary<int, int[]> seatViewMapping = new Dictionary<int, int[]>();
      BuildSeatViewMap(map, ref seatViewMapping);
      var output = ProcessMap(map, seatViewMapping);

      Console.WriteLine(output);

      while(!map.Equals(output)) {
        map = output;
        output = ProcessMap(map, seatViewMapping);
        Console.WriteLine();
        Console.WriteLine(output);
      }

      return output.Count(c => c == '#');
    }

    private static void BuildSeatViewMap(string map, ref Dictionary<int, int[]> seatViewMapping) {
      var rows = 1 + map.Count(c => c == '\n');
      var cols = 1 + map.IndexOf('\n');

      for(int y = 0; y < rows; y++) {
        for(int x = 0; x < cols; x++) {
          var index = ConvertCoordinatesToStringIndex(x, y, cols);
          if (index < map.Length && map[index] == 'L') {
            // var chairSet = new int[]{ -1, -1, -1, -1, -1, -1, -1, -1 };
            // chairSet[0] = FindChairInDirection(map, x, y, -1, -1); // Upper Left
            // chairSet[1] = FindChairInDirection(map, x, y, -1, 0);  // Left
            // chairSet[2] = FindChairInDirection(map, x, y, -1, 1);  // Lower Left
            // chairSet[3] = FindChairInDirection(map, x, y, 0, - 1); // Up
            // chairSet[4] = FindChairInDirection(map, x, y, 0, 1);   // Down
            // chairSet[5] = FindChairInDirection(map, x, y, 1, -1);  // Upper Right
            // chairSet[6] = FindChairInDirection(map, x, y, 1, 0);   // Right
            // chairSet[7] = FindChairInDirection(map, x, y, 1, 1);   // Lower Right

            // seatViewMapping.Add(index, chairSet);
            seatViewMapping.Add(index, BuildSingleChairMap(map, x, y, rows, cols));
          }
        }
      }
    }

    private static int[] BuildSingleChairMap(string map, int x, int y, int rows, int cols) {
      var chairSet = new int[]{ -1, -1, -1, -1, -1, -1, -1, -1 };

      // Set Checking Variables
      var x1 = x;
      var y1 = y;

      // Check Up
      for(y1 = y - 1; y1 > -1; y1--) {
        var index = ConvertCoordinatesToStringIndex(x, y1, cols);
        if (index > -1 && index < map.Length) {
          if (map[index] == 'L' || map[index] == '#') {
            chairSet[3] = index;
            break;
          }
        }
      }

      // Check Down
      for(y1 = y + 1; y1 < rows; y1++) {
        var index = ConvertCoordinatesToStringIndex(x, y1, cols);
        if (index > -1 && index < map.Length) {
          if (map[index] == 'L' || map[index] == '#') {
            chairSet[4] = index;
            break;
          }
        }
      }
      
      // Check Left
      for(x1 = x - 1; x1 > -1; x1--) {
        var index = ConvertCoordinatesToStringIndex(x1, y, cols);
        if (index > -1 && index < map.Length) {
          if (map[index] == 'L' || map[index] == '#') {
            chairSet[1] = index;
            break;
          }
        }
      }

      // Check Right
      for(x1 = x + 1; x1 < cols; x1++) {
        var index = ConvertCoordinatesToStringIndex(x1, y, cols);
        if (index > -1 && index < map.Length) {
          if (map[index] == 'L' || map[index] == '#') {
            chairSet[6] = index;
            break;
          }
        }
      }

      // Check Up Left
      x1 = x;
      y1 = y;
      while(x1 > 0 && y1 > 0) {
        x1--;
        y1--;
        var index = ConvertCoordinatesToStringIndex(x1, y1, cols);
        if (index > -1 && index < map.Length) {
          if (map[index] == 'L' || map[index] == '#') { 
            chairSet[0] = index;
            break;
          }
        }
      }

      // Check Up Right
      x1 = x;
      y1 = y;
      while(x1 < rows && y1 > 0) {
        x1++;
        y1--;
        var index = ConvertCoordinatesToStringIndex(x1, y1, cols);
        if (index > -1 && index < map.Length) {
          if (map[index] == 'L' || map[index] == '#') { 
            chairSet[5] = index;
            break;
          }
        }
      }

      // Check Down Left
      x1 = x;
      y1 = y;
      while(x1 > 0 && y1 < cols) {
        x1--;
        y1++;
        var index = ConvertCoordinatesToStringIndex(x1, y1, cols);
        if (index > -1 && index < map.Length) {
          if (map[index] == 'L' || map[index] == '#') { 
            chairSet[2] = index;
            break;
          }
        }
      }

      // Check Down Right
      x1 = x;
      y1 = y;
      while(x1 < rows && y1 < cols) {
        x1++;
        y1++;
        var index = ConvertCoordinatesToStringIndex(x1, y1, cols);
        if (index > -1 && index < map.Length) {
          if (map[index] == 'L' || map[index] == '#') { 
            chairSet[7] = index;
            break;
          }
        }
      }

      return chairSet;
    }

    private static int ConvertCoordinatesToStringIndex(int x, int y, int cols) {
      return x + y * (cols);
    }

    private static int[] ConvertStringIndexToCoordinates(int index, int cols) {
      int[] coords = new int[]{ -1, -1 };

      coords[0] = index % cols;
      coords[1] = index / cols;

      return coords;
    }

    private static int FindChairInDirection(string map, int x, int y, int xMod, int yMod) {
      var rows = 1 + map.Count(c => c == '\n');
      var cols = 1 + map.IndexOf('\n');

      x += xMod; y += yMod; // Calculate new coordinates - Thanks Chad
      if (x < 0 || x >= rows || y < 0 || y >= cols) return -1;
      var index = ConvertCoordinatesToStringIndex(x, y, cols);
      if (index >= map.Length) return -1;
      if (map[index] == 'L' || map[index] == '#') return ConvertCoordinatesToStringIndex(x, y, cols);

      return FindChairInDirection(map, x, y, xMod, yMod);
    }

    private static string ProcessMap(string map, Dictionary<int, int[]> seatViewMapping) {
      var output = map.ToCharArray();
      foreach(int key in seatViewMapping.Keys) {
        int count = 0;
        foreach(int chair in seatViewMapping[key]) {
          if (chair > -1 && chair < map.Length && map[chair] == '#') count++;
        }
        switch(map[key]) {
          case 'L':
            if (count == 0) output[key] = '#';
            break;
          case '#':
            if (count >= 5) output[key] = 'L';
            break;
          default:
            // Do Nothing
            break;
        }
      }
      
      return new string(output);
    }

  }
}