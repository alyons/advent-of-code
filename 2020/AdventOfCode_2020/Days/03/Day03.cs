using System;
using System.Collections.Generic;
using System.IO;
using AdventOfCode_2020.Functions;

namespace AdventOfCode_2020.Days {
  public static class Day03 {
    public static int CalculateCollisions() {
      StreamReader data = new StreamReader(@"AdventOfCode_2020/Days/03/input.txt");
      string line;
      List<string> dataSet = new List<string>();

      while((line = data.ReadLine()) != null) {
        dataSet.Add(line);
      };

      var velocity = new int[] {3, 1};
      bool[,] map = new bool[dataSet[0].Length, dataSet.Count];

      for(var y = 0; y < dataSet.Count; y++) {
        for(var x = 0; x < dataSet[0].Length; x++) {
          map[x,y] = dataSet[y][x] == '#';
        }
      }

      return Sled.TreeCollisions(velocity, map);
    }

    public static long ProductCollision() {
      StreamReader data = new StreamReader(@"AdventOfCode_2020/Days/03/input.txt");
      string line;
      List<string> dataSet = new List<string>();

      while((line = data.ReadLine()) != null) {
        dataSet.Add(line);
      };

      List<int[]> velocities = new List<int[]>();
      velocities.Add(new int[] {1, 1});
      velocities.Add(new int[] {3, 1});
      velocities.Add(new int[] {5, 1});
      velocities.Add(new int[] {7, 1});
      velocities.Add(new int[] {1, 2});

      bool[,] map = new bool[dataSet[0].Length, dataSet.Count];

      for(var y = 0; y < dataSet.Count; y++) {
        for(var x = 0; x < dataSet[y].Length; x++) {
          map[x,y] = dataSet[y][x] == '#';
        }
      }

      List<int> results = new List<int>();
      long output = 1;

      foreach(int[] velocity in velocities) {
        var trees = Sled.TreeCollisions(velocity, map);
        Console.WriteLine("Slope [{0},{1}] collides with {2} trees.", velocity[0], velocity[1], trees);
        output *= trees;
      }

      return output;
    }
  }
    
}