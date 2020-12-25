using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AdventOfCode_2020.Days {
  public static class Day24 {
    public static int BlackTileCount() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/24/input.txt");
      string line;
      Dictionary<string, bool> tileColor = new Dictionary<string, bool>();

      while((line = reader.ReadLine()) != null) {
        int x = 0, y = 0, z = 0;

        // Determine direction
        int index = 0;
        string dir = "";
        while(index < line.Length) {
          dir += line[index];

          switch(dir) {
            case "e":
              x += 1;
              y += 1;
              dir = "";
              break;
            case "se":
              x += 1;
              z -= 1;
              dir = "";
              break;
            case "sw":
              y -= 1;
              z -= 1;
              dir = "";
              break;
            case "w":
              x -= 1;
              y -= 1;
              dir = "";
              break;
            case "nw":
              x -= 1;
              z += 1;
              dir = "";
              break;
            case "ne":
              y += 1;
              z += 1;
              dir = "";
              break;
            default:
              // Do nothing
              break;
          }

          index++;
        }

        // Increment coordinates by direction

        // Update tile in Dictionary
        string tileId = x + "," + y + "," + z;
        if (tileColor.ContainsKey(tileId)) {
          tileColor[tileId] = !tileColor[tileId];
        } else {
          tileColor.Add(tileId, true);
        }
      }

      return tileColor.Values.Count(v => v);
    }

    public static int BlackTileDays() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/24/input.txt");
      string line;
      Dictionary<string, bool> tiles = new Dictionary<string, bool>();
      Dictionary<string, int> blackNeighbors = new Dictionary<string, int>();

      while((line = reader.ReadLine()) != null) {
        int x = 0, y = 0, z = 0;

        // Determine direction
        int index = 0;
        string dir = "";
        while(index < line.Length) {
          dir += line[index];

          switch(dir) {
            case "e":
              x += 1;
              y += 1;
              dir = "";
              break;
            case "se":
              x += 1;
              z -= 1;
              dir = "";
              break;
            case "sw":
              y -= 1;
              z -= 1;
              dir = "";
              break;
            case "w":
              x -= 1;
              y -= 1;
              dir = "";
              break;
            case "nw":
              x -= 1;
              z += 1;
              dir = "";
              break;
            case "ne":
              y += 1;
              z += 1;
              dir = "";
              break;
            default:
              // Do nothing
              break;
          }

          index++;
        }

        // Increment coordinates by direction

        // Update tile in Dictionary
        string tileId = x + "," + y + "," + z;
        if (tiles.ContainsKey(tileId)) {
          tiles[tileId] = !tiles[tileId];
        } else {
          tiles.Add(tileId, true);
        }
      }

      Console.WriteLine("Day 0: {0}", tiles.Values.Count(v => v));

      // PrintTiles(tiles);

      for(int d = 0; d < 100; d++) {
        blackNeighbors.Clear();

        foreach(KeyValuePair<string, bool> tile in tiles) {
          if (tile.Value) { // If the tile is Black (true)
            // blackNeighbors.Set(tile.Key, 0);
            var neighbors = GetNeighborIds(tile.Key);
            foreach(string neighbor in neighbors) {
              if (blackNeighbors.ContainsKey(neighbor)) {
                blackNeighbors[neighbor]++;
              } else {
                blackNeighbors.Add(neighbor, 1);
              }
            }
          }
        }

        HashSet<string> allTiles = tiles.Keys.ToHashSet();
        allTiles.UnionWith(blackNeighbors.Keys);

        foreach(string tileId in allTiles) {
          var isBlack = (tiles.ContainsKey(tileId)) ? tiles[tileId] : false;
          var color = isBlack ? "Black" : "White";

          // Console.Write("[{0}] {1}: {2}", tileId, color, blackNeighbors[tileId]);

          if (isBlack && (!blackNeighbors.ContainsKey(tileId) || blackNeighbors[tileId] == 0 || blackNeighbors[tileId] > 2)) {
            tiles[tileId] = false;
            // Console.Write(" => White");
          } else if (!isBlack && blackNeighbors.ContainsKey(tileId) && blackNeighbors[tileId] == 2) {
            tiles.Set(tileId, true);
            // Console.Write(" => Black");
          }

          // Console.WriteLine();
        }


        // foreach(KeyValuePair<string, bool> pair in tiles) {
        //   Console.WriteLine("[{0}]: {1}", pair.Key, pair.Value ? "Black" : "White");
        // }

        Console.WriteLine("Day {0}: {1}", d + 1, tiles.Values.Count(v => v));
        // PrintTiles(tiles);
      }

      return tiles.Values.Count(v => v);
    }

    static void PrintTiles(Dictionary<string, bool> tiles) {
      foreach(KeyValuePair<string, bool> pair in tiles) {
        Console.WriteLine("[{0}]: {1}", pair.Key, pair.Value ? "Black" : "White");
      }
    }

    static string[] GetNeighborIds(string tileId) {
      var parts = tileId.Split(',');
      var x = int.Parse(parts[0]);
      var y = int.Parse(parts[1]);
      var z = int.Parse(parts[2]);

      return new string[]{
        (x + 1) + "," + (y + 1) + "," + z,
        (x + 1) + "," + y + "," + (z - 1),
        x + "," + (y - 1) + "," + (z - 1),
        (x - 1) + "," + (y - 1) + "," + z,
        (x - 1) + "," + y + "," + (z + 1),
        x + "," + (y + 1) + "," + (z + 1),
      };
    }
  }
}