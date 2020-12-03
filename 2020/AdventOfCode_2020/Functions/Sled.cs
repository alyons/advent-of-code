using System.Collections.Generic;

namespace AdventOfCode_2020.Functions {
  public static class Sled {
    public static int TreeCollisions(int[] velocity, bool[,] map) {
      int count = 0, currentX = 0, currentY = 0;
      var xMax = map.GetLength(0);
      var yMax = map.GetLength(1);

      while(currentY < yMax - 1) {
        currentY += velocity[1];
        currentX += velocity[0];

        var checkValue = currentX % xMax;
        if (map[checkValue, currentY]) count++;
      }


      return count;
    }
  }
}