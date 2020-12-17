using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode_2020.Days {
  public static class Day17 {
    public static int ActiveCubes() {
      Dictionary<string, bool> powerCubes = new Dictionary<string, bool>();
      Dictionary<string, List<string>> neighborSets = new Dictionary<string, List<string>>();

      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/17/input.txt");
      string line;
      int y = 0;
      while((line = reader.ReadLine()) != null) {
        for(int x = 0; x < line.Length; x++) {
          powerCubes.Add($"{x},{y},0", line[x] == '#');
          neighborSets.Add($"{x},{y},0", GenerateNeighbors(x, y, 0));
        }
        y++;
      }

      List<string> allNeighbors = new List<string>();
      HashSet<string> uniqueCoordinates = new HashSet<string>();

      for(int cycles = 0; cycles < 6; cycles++) {
        allNeighbors.Clear();
        uniqueCoordinates.Clear();
        foreach(KeyValuePair<string, bool> cube in powerCubes) {
          if (cube.Value) { // If the cube is on
            allNeighbors.AddRange(neighborSets[cube.Key]);
          }
        }

        uniqueCoordinates.UnionWith(allNeighbors);

        foreach(string coords in uniqueCoordinates) {
          if (!powerCubes.ContainsKey(coords)) {
            var ints = StringToCoordinates(coords);
            powerCubes.Add(coords, false);
            neighborSets.Add(coords, GenerateNeighbors(ints[0], ints[1], ints[2]));
          }
          var onCount = allNeighbors.Count(c => c.Equals(coords));
          powerCubes[coords] = (powerCubes[coords]) ? onCount == 3 || onCount == 4 : onCount == 3;
        }
      }

      return powerCubes.Count(p => p.Value);
    }

    public static int Active4DCubes() {
      Dictionary<string, bool> powerCubes = new Dictionary<string, bool>();
      Dictionary<string, List<string>> neighborSets = new Dictionary<string, List<string>>();

      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/17/input.txt");
      string line;
      int y = 0;

      while((line = reader.ReadLine()) != null) {
        for(int x = 0; x < line.Length; x++) {
          var coords = $"{x},{y},0,0";
          powerCubes.Add(coords, line[x] == '#');
          neighborSets.Add(coords, Generate4DNeighbors(coords));
        }
        y++;
      }

      List<string> allNeighbors = new List<string>();
      HashSet<string> uniqueCoordinates = new HashSet<string>();

      for(int cycles = 0; cycles < 6; cycles++) {
        allNeighbors.Clear();
        uniqueCoordinates.Clear();
        foreach(KeyValuePair<string, bool> cube in powerCubes) {
          if (cube.Value) { // If the cube is on
            allNeighbors.AddRange(neighborSets[cube.Key]);
          }
        }

        uniqueCoordinates.UnionWith(allNeighbors);

        foreach(string coords in uniqueCoordinates) {
          if (!powerCubes.ContainsKey(coords)) {
            powerCubes.Add(coords, false);
            neighborSets.Add(coords, Generate4DNeighbors(coords));
          }
          var onCount = allNeighbors.Count(c => c.Equals(coords));
          powerCubes[coords] = (powerCubes[coords]) ? onCount == 3 || onCount == 4 : onCount == 3;
        }
      }

      return powerCubes.Count(p => p.Value);
    }

    static List<string> GenerateNeighbors(int x, int y, int z) {
      List<string> neighbors = new List<string>();

      for(int i = x - 1; i < x + 2; i++) {
        for(int j = y - 1; j < y + 2; j++) {
          for(int k = z - 1; k < z + 2; k++) {
            neighbors.Add($"{i},{j},{k}");
          }
        }
      }

      return neighbors;
    }

    static List<string> Generate4DNeighbors(string coords) {
      int[] values = StringToCoordinates(coords);
      int x = values[0];
      int y = values[1];
      int z = values[2];
      int w = values[3];
      List<string> neighbors = new List<string>();

      for(int i = x - 1; i < x + 2; i++) {
        for(int j = y - 1; j < y + 2; j++) {
          for(int k = z - 1; k < z + 2; k++) {
            for(int l = w - 1; l < w + 2; l++) {
              neighbors.Add($"{i},{j},{k},{l}");
            }
          }
        }
      }

      return neighbors;
    }

    static int[] StringToCoordinates(string value) { 
      return Array.ConvertAll<string, int>(value.Split(','), int.Parse);
    }
  }
}