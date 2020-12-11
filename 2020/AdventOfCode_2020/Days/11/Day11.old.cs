using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AdventOfCode_2020.Days {
  public static class Day11_Old {

    struct ProcessOutput {
      public char Character { get; }
      public int Index { get; }

      public ProcessOutput(char c, int i) {
        Character = c;
        Index = i;
      }
    }

    public static int FindOccupiedSeatsAsync() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/11/input.txt");
      var map = reader.ReadToEnd();
      Dictionary<string, string[]> seatViewMapping = new Dictionary<string, string[]>(); 
      var output = ProcessMapAsync(map, 5, true, ref seatViewMapping);

      // Console.WriteLine(output);

      while (!map.Equals(output)) {
        map = output;
        output = ProcessMapAsync(map, 5, true, ref seatViewMapping);
      }

      return output.Count(c => c == '#');
      // return QueenOccupiedSeatsEx(map, 3, 4); // testQueen1 = 8
      // return QueenOccupiedSeatsEx(map, 1, 1); // testQueen2 = 0
      // return QueenOccupiedSeatsEx(map, 3, 3); // testQueen3 = 0
    }

    private static string CoordinatesToString(int x, int y) {
      return x + "," + y;
    }

    private static int[] StringToCoordinates(string coords) {
      var parts = coords.Split(',');
      return new int[]{ int.Parse(parts[0]), int.Parse(parts[1]) };
    }

    private static string ProcessMapAsync(string map, int occupiedLimit, bool useQueenAlgorithm, ref Dictionary<string, string[]> seatViewMapping) {
      char[] output = map.ToCharArray();
      var tasks = new List<Task>();
      var results = new List<ProcessOutput>();
      var rows = 1 + map.Count(c => c == '\n');
      var cols = 1 + map.IndexOf('\n');

      for(int i = 0; i < map.Length; i++) {
        if (map[i] == 'L' || map[i] == '#') { // Don't process empty locations (i.e. only process seats)
          var coords = ConvertStringIndexToCoordinates(i, cols);
          var occupiedSeats = useQueenAlgorithm ? QueenOccupiedSeats(map, coords[0], coords[1]) : AdjacentOccupiedSeats(map, coords[0], coords[1]);
          if (map[i] == 'L' && occupiedSeats == 0) output[i] = '#';
          if (map[i] == '#' && occupiedSeats >= occupiedLimit) output[i] = 'L';
        }
      }

      // for(int i = 0; i < map.Length; i++) {
      //   if (map[i] == 'L' || map[i] == '#') { // Don't process empty locations (i.e. only process seats)
      //     tasks.Add(Task<ProcessOutput>.Run(() => {
      //       results.Add(ProcessCharacter(map, i, cols, occupiedLimit, useQueenAlgorithm));
      //     }));
      //   }
      // }

      // Task t = Task.WhenAll(tasks);
      // t.Wait();

      // if (t.Status == TaskStatus.RanToCompletion) {
      //   Console.WriteLine("Mission Complete!");
      // }

      // foreach(ProcessOutput p in results) {
      //   if (p.Index > -1 && p.Index < output.Length) {
      //     output[p.Index] = p.Character;
      //   }
      // }

      return new string(output);
    }

    private static int QueenOccupiedSeatsEx(string map, int x, int y) {
      int count = 0;

      for (int yMod = -1; yMod < 2; yMod++) {
        for(int xMod = -1; xMod < 2; xMod++) {
          if (xMod == 0 && yMod == 0) continue;
          if (FullChairInDirection(map, x, y, xMod, yMod)) count++;
        }
      }

      return count;
    }

    private static bool ChairInDirection(string map, int x, int y, int xMod, int yMod) {
      var rows = 1 + map.Count(c => c == '\n');
      var cols = 1 + map.IndexOf('\n');

      x += xMod; y += yMod; // Calculate new coordinates - Thanks Chad
      if (x < 0 || x >= rows || y < 0 || y >= cols) return false;
      var index = ConvertCoordinatesToStringIndex(x, y, cols);
      if (index >= map.Length) return false;
      if (map[index] == 'L' || map[index] == '#') return true;
            
      return ChairInDirection(map, x, y, xMod, yMod);
    } 

    private static bool FullChairInDirection(string map, int x, int y, int xMod, int yMod) {
      var rows = 1 + map.Count(c => c == '\n');
      var cols = 1 + map.IndexOf('\n');

      x += xMod; y += yMod; // Calculate new coordinates - Thanks Chad
      if (x < 0 || x >= rows || y < 0 || y >= cols) return false;
      var index = ConvertCoordinatesToStringIndex(x, y, cols);
      if (index >= map.Length) return false;
      if (map[index] == '#') return true;
      if (map[index] == 'L') return false;

      return FullChairInDirection(map, x, y, xMod, yMod);
    }

    private static ProcessOutput ProcessCharacter(string map, int index, int cols, int occupiedLimit = 4, bool useQueenAlgorithm = false) {
      if (index >= map.Length) return new ProcessOutput('$', -1);

      var coords = ConvertStringIndexToCoordinates(index, cols);
      var occupiedSeats = useQueenAlgorithm ? QueenOccupiedSeats(map, coords[0], coords[1]) : AdjacentOccupiedSeats(map, coords[0], coords[1]);
      if (map[index] == 'L' && occupiedSeats == 0) return new ProcessOutput('#', index);
      if (map[index] == '#' && occupiedSeats >= occupiedLimit) return new ProcessOutput('L', index);
      return new ProcessOutput(map[index], index);
    }

    // Second Attempt (Solved Algo 1, but slow)
    public static int FindOccupiedSeatsEx() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/11/input.txt");
      var map = reader.ReadToEnd();
      var output = ProcessMapEx(map);

      while (!map.Equals(output)) {
        map = output;
        output = ProcessMapEx(map);
      }

      return output.Count(c => c == '#');
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

    private static string ProcessMapEx(string map, int occupiedLimit = 4, bool useQueenAlgorithm = false) {
      string output = "";

      var rows = 1 + map.Count(c => c == '\n');
      var cols = 1 + map.IndexOf('\n');

      for(int y = 0; y < rows; y++) {
        for(int x = 0; x < cols; x++) {
          var index = ConvertCoordinatesToStringIndex(x, y, cols);
          if (index < map.Length) {
            var occupiedSeats = !useQueenAlgorithm ? AdjacentOccupiedSeats(map, x, y) : QueenOccupiedSeats(map, x, y);
            switch(map[index]) {
              case 'L':
                if (occupiedSeats == 0) {
                  output += '#';
                } else {
                  output += 'L';
                }
                break;
              case '#':
                if (occupiedSeats >= occupiedLimit) {
                  output += 'L';
                } else {
                  output += '#';
                }
                break;
              default:
                output += map[index];
                break;
            }
          }
          // if (x == 9 && y == 0) Console.WriteLine("[{0}]: {1} => {2} AdjacentSeats: {3}", index, map[index], output[index], AdjacentOccupiedSeats(map, x, y));
        }
      }

      return output;
    }

    private static int AdjacentOccupiedSeats(string map, int x, int y) {
      int count = 0;
      var rows = 1 + map.Count(c => c == '\n');
      var cols = 1 + map.IndexOf('\n');

      int xMin = Math.Max(0, x - 1);
      int xMax = Math.Min(cols, x + 1);
      int yMin = Math.Max(0, y - 1);
      int yMax = Math.Min(rows, y + 1);

      // if (x == 9 && y == 0) Console.WriteLine("{0} <= x <= {1}\n{2} <= y <= {3}", xMin, xMax, yMin, yMax);

      for (int y1 = Math.Max(0, y - 1); y1 < Math.Min(rows, y + 2); y1++) {
        for(int x1 = Math.Max(0, x - 1); x1 < Math.Min(cols, x + 2); x1++) {
          var index = ConvertCoordinatesToStringIndex(x1, y1, cols);
          if (!(x1 == x && y1 == y) && index < map.Length && map[index] == '#') count++;
        }
      }

      return count;
    }

    private static int QueenOccupiedSeats(string map, int x, int y) {
      int count = 0;
      var rows = 1 + map.Count(c => c == '\n');
      var cols = 1 + map.IndexOf('\n');
      int x1 = x, y1 = y;

      // Check Up
      for(y1 = y - 1; y1 >= 0; y1--) {
        var index = ConvertCoordinatesToStringIndex(x, y1, cols);
        if (index < map.Length) {
          if (map[index] == '.') continue;
          if (map[index] == 'L') break;
          if (map[index] == '#') { count++; break; }
        }
      }

      // Check Down
      for(y1 = y + 1; y1 < cols; y1++) {
        var index = ConvertCoordinatesToStringIndex(x, y1, cols);
        if (index < map.Length) {
          if (map[index] == '.') continue;
          if (map[index] == 'L') break;
          if (map[index] == '#') { count++; break; }
        }
      }

      // Check Left
      for(x1 = x - 1; x1 >= 0; x1--) {
        var index = ConvertCoordinatesToStringIndex(x1, y, cols);
        if (index < map.Length) {
          if (map[index] == '.') continue;
          if (map[index] == 'L') break;
          if (map[index] == '#') { count++; break; }
        }
      }

      // Check Right
      for(x1 = x + 1; x1 < cols; x1++) {
        var index = ConvertCoordinatesToStringIndex(x1, y, cols);
        if (index < map.Length) {
          if (map[index] == '.') continue;
          if (map[index] == 'L') break;
          if (map[index] == '#') { count++; break; }
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
          if (map[index] == 'L') break;
          if (map[index] == '#') { count++; break; }
        }
      }

      // Check Up Right
      x1 = x;
      y1 = y;
      while(x1 < rows && y1 > 0) {
        x1++;
        y1--;
        var index = ConvertCoordinatesToStringIndex(x1, y1, cols);
        if (index < map.Length) {
          if (map[index] == 'L') break;
          if (map[index] == '#') { count++; break; }
        }
      }

      // Check Down Left
      x1 = x;
      y1 = y;
      while(x1 > 0 && y1 < cols) {
        x1--;
        y1++;
        var index = ConvertCoordinatesToStringIndex(x1, y1, cols);
        if (index < map.Length) {
          if (map[index] == 'L') break;
          if (map[index] == '#') { count++; break; }
        }
      }

      // Check Down Right
      x1 = x;
      y1 = y;
      while(x1 < rows && y1 < cols) {
        x1++;
        y1++;
        var index = ConvertCoordinatesToStringIndex(x1, y1, cols);
        if (index < map.Length) {
          if (map[index] == 'L') break;
          if (map[index] == '#') { count++; break; }
        }
      }

      return count;
    }

    // First Attempt

    public static int FindOccupiedSeats() {
      var map = ReadMap(@"AdventOfCode_2020/Days/11/testInput.txt");
      char[,] output = ProcessMap(map);


      while(!AreMapsEqual(map, output)) {
        map = output;
        output = ProcessMap(map);
      }

      return CountOccupiedSeats(output);
    }

    private static char[,] ReadMap(string filePath) {
      StreamReader reader = new StreamReader(filePath);
      List<string> allStrings = new List<string>();
      string line;

      while((line = reader.ReadLine()) != null) {
        if (!String.IsNullOrWhiteSpace(line)) allStrings.Add(line);
      }

      var rows = allStrings.Count;
      var cols = allStrings[0].Length;

      char[,] map = new char[cols, rows];

      return map;
    }

    private static char[,] ProcessMap(char[,] map) {
      char[,] output = new char[map.GetLength(0), map.GetLength(1)];

      for(int x = 0; x < map.GetLength(0); x++) {
        for (int y = 0; y < map.GetLength(1); y++) {
          switch(map[x,y]) {
            case 'L':
              if (AdjacentOccupiedSpaces(map, x, y) == 0) {
                output[x,y] = '#';
              } else {
                output[x,y] = 'L';
              }
              break;
            case '#':
              if (AdjacentOccupiedSpaces(map, x, y) >= 4) {
                output[x,y] = 'L';
              }
              break;
            default: // '.'
              break;
          }
        }
      }

      return output;
    }

    private static bool AreMapsEqual(char[,] a, char[,] b) {
      if (a.GetLength(0) != b.GetLength(0)) return false;
      if (a.GetLength(1) != b.GetLength(1)) return false;

      for(int x = 0; x < a.GetLength(0); x++) {
        for(int y = 0; y < a.GetLength(1); y++) {
          if (a[x, y] != b[x, y]) return false;
        }
      }

      return true;
    }

    private static int AdjacentOccupiedSpaces(char[,] map, int x, int y) {
      int count = 0;

      for(int x1 = Math.Max(0, x - 1); x1 < Math.Min(map.GetLength(0), x + 1); x1++) {
        for(int y1 = Math.Max(0, y - 1); y1 < Math.Min(map.GetLength(1), y + 1); y1++) {
          if (x1 == x && y1 == y) continue;
          if (map[x1, y1] == '#') count++;
        }
      }

      return count;
    }

    private static int CountOccupiedSeats(char[,] map) {
      int count = 0;

      for(int x = 0; x < map.GetLength(0); x++) {
        for (int y = 0; y < map.GetLength(1); y++) {
          if (map[x,y] == '#') count++;
        }
      }

      return count;
    }
  }
}