using System;
using System.Collections.Generic;
using System.IO;

namespace AdventOfCode_2020.Days {
  public static class Day12 {
    public static int ManhattanDistance() {
      Ship currPos = new Ship(0, 0, 'E');

      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/12/input.txt");
      string line;
      List<MoveInstruction> instructions = new List<MoveInstruction>();
      while((line = reader.ReadLine()) != null) {
        instructions.Add(new MoveInstruction(
          line[0],
          int.Parse(line.Substring(1))
        ));
      }

      foreach(MoveInstruction move in instructions) {
        currPos = Move(currPos, move);
      }


      return Math.Abs(currPos.X) + Math.Abs(currPos.Y);
    }

    public static int CaluclateWayPoint() {
      Ship ship = new Ship(0, 0, 'E');
      Ship waypoint = new Ship(10, 1, 'E');

      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/12/input.txt");
      string line;
      List<MoveInstruction> instructions = new List<MoveInstruction>();
      while((line = reader.ReadLine()) != null) {
        instructions.Add(new MoveInstruction(
          line[0],
          int.Parse(line.Substring(1))
        ));
      }

      foreach(MoveInstruction move in instructions) {
        if (move.Direction == 'F') {
          ship = AdjustShip(ship, waypoint, move);
        } else {
          waypoint = AdjustWaypoint(waypoint, move);
        }
      }

      return Math.Abs(ship.X) + Math.Abs(ship.Y);
    }

    struct Ship {
      public int X { get; set; }
      public int Y { get; set; }
      public char Facing { get; set; }

      public Ship(int x, int y, char f) {
        X = x;
        Y = y;
        Facing = f;
      }

      public override string ToString() {
        return "[" + X + "," + Y + "]: " + Facing;
      }
    }

    struct MoveInstruction {
      public char Direction { get; }
      public int Units { get; }

      public MoveInstruction(char dir, int u) {
        Direction = dir;
        Units = u;
      }

      public override string ToString() {
        return Direction + ": " + Units;
      }

      public bool IsWaypointInstruction() {
        return Direction == 'N' || Direction == 'S' || Direction == 'E' || Direction == 'W';
      }
    }

    /**
    * North and East are Positive
    */
    static Ship Move(Ship currPos, MoveInstruction move) {
      // If 'L' or 'R' => Apply Rotation
      // Else => Apply Motion

      if (move.Direction == 'L' || move.Direction == 'R') {
        currPos.Facing = Turn(currPos.Facing, move.Direction == 'L', move.Units);
      } else {

        var motionDirection = (move.Direction == 'F') ? currPos.Facing : move.Direction;

        switch(motionDirection) {
          case 'N': currPos.Y += move.Units; break;
          case 'E': currPos.X += move.Units; break;
          case 'S': currPos.Y -= move.Units; break;
          case 'W': currPos.X -= move.Units; break;
        }
      }

      return currPos;
    }
    
    static Ship AdjustWaypoint(Ship waypoint, MoveInstruction move) {
      switch(move.Direction) {
        case 'N': waypoint.Y += move.Units; break;
        case 'E': waypoint.X += move.Units; break;
        case 'S': waypoint.Y -= move.Units; break;
        case 'W': waypoint.X -= move.Units; break;
        case 'L':
          for(int i = 0; i < move.Units / 90; i++) {
            waypoint.Y += waypoint.X;
            waypoint.X = waypoint.Y - waypoint.X;
            waypoint.Y = waypoint.Y - waypoint.X;
            waypoint.X *= -1;
          }
          break;
        case 'R':
          for(int i = 0; i < move.Units / 90; i++) {
            waypoint.Y += waypoint.X;
            waypoint.X = waypoint.Y - waypoint.X;
            waypoint.Y = waypoint.Y - waypoint.X;
            waypoint.Y *= -1;
          }
          break;
      }

      return waypoint;
    }

    static Ship AdjustShip(Ship ship, Ship waypoint, MoveInstruction move) {
      ship.X += waypoint.X * move.Units;
      ship.Y += waypoint.Y * move.Units;

      return ship;
    }
    private static char Turn(char direction, bool left, int degrees) {

      var finalDirection = direction;
      do {
        if (left) {
          switch(finalDirection) {
            case 'N': finalDirection = 'W'; break;
            case 'E': finalDirection = 'N'; break;
            case 'S': finalDirection = 'E'; break;
            case 'W': finalDirection = 'S'; break;
          }
        } else {
          switch(finalDirection) {
            case 'N': finalDirection = 'E'; break;
            case 'E': finalDirection = 'S'; break;
            case 'S': finalDirection = 'W'; break;
            case 'W': finalDirection = 'N'; break;
          }
        }

        degrees -= 90;
      } while(degrees > 0);

      return finalDirection;
    }
  }
}