using System;
using System.Collections.Generic;
using System.IO;

namespace AdventOfCode_2020.Days {
  public static class Day22 {
    public static int CombatScore() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/22/input.txt");
      String line;

      Queue<int> player1 = new Queue<int>();
      Queue<int> player2 = new Queue<int>();

      bool setPlayer2 = false;
      while((line = reader.ReadLine()) != null) {
        if (String.IsNullOrWhiteSpace(line)) { setPlayer2 = true; continue; }
        if (!line.Contains("Player")) {
          if (setPlayer2) player2.Enqueue(int.Parse(line)); else player1.Enqueue(int.Parse(line));
        }
      }

      while(player1.Count > 0 && player2.Count > 0) {
        var a = player1.Dequeue();
        var b = player2.Dequeue();

        if (a > b) { player1.Enqueue(a); player1.Enqueue(b); }
        if (b > a) { player2.Enqueue(b); player2.Enqueue(a); }
      }

      Console.WriteLine(String.Join(", ", player1));
      Console.WriteLine(String.Join(", ", player2));

      return (player1.Count > 0) ? CalculateScore(player1) : CalculateScore(player2);
    }

    public static int RecursiveCombatScore() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/22/input.txt");
      String line;

      Queue<int> player1 = new Queue<int>();
      Queue<int> player2 = new Queue<int>();

      bool setPlayer2 = false;
      while((line = reader.ReadLine()) != null) {
        if (String.IsNullOrWhiteSpace(line)) { setPlayer2 = true; continue; }
        if (!line.Contains("Player")) {
          if (setPlayer2) player2.Enqueue(int.Parse(line)); else player1.Enqueue(int.Parse(line));
        }
      }

      RecursiveCombat(player1, player2);

      Console.WriteLine(String.Join(", ", player1));
      Console.WriteLine(String.Join(", ", player2));

      return (player1.Count > 0) ? CalculateScore(player1) : CalculateScore(player2);
    }

    static bool RecursiveCombat(Queue<int> player1, Queue<int> player2, int gameLevel = 0) {
      HashSet<string> gameState = new HashSet<string>();
      gameLevel += 1;

      bool player1Victory = false;
      bool gameOver = false;

      // Console.WriteLine("Beginning Game: {0}", gameLevel);

      while(!gameOver) {
        var roundState = GenerateGameState(player1, player2);
        if (gameState.Contains(roundState)) {
          Console.WriteLine("Found pre-existing state...");
          player1Victory = true;
          gameOver = true;
          break;
        } else {
          gameState.Add(roundState);
        }

        var a = player1.Dequeue();
        var b = player2.Dequeue();

        if (a <= player1.Count && b <= player2.Count) {
          // Start a recursive game
          Console.WriteLine("Starting a recursive game...");
          if (gameLevel == 1) Console.WriteLine("Player 1 ({0}): [{1}]", a, String.Join(',', player1));
          if (gameLevel == 1) Console.WriteLine("Player 2 ({0}): [{1}]", b, String.Join(',', player2));

          var rPlayer1 = player1.CloneCount(a);
          var rPlayer2 = player2.CloneCount(b);

          if (RecursiveCombat(rPlayer1, rPlayer2, gameLevel)) {
            player1.Enqueue(a); player1.Enqueue(b);
          } else {
            player2.Enqueue(b); player2.Enqueue(a);
          }
        } else {
          // Console.WriteLine("Play normally: {0} vs {1}", a, b);
          if (a > b) { player1.Enqueue(a); player1.Enqueue(b); }
          if (b > a) { player2.Enqueue(b); player2.Enqueue(a); }
        }

        if (player1.Count == 0) {
          player1Victory = false;
          gameOver = true;
        } else if (player2.Count == 0) {
          player1Victory = true;
          gameOver = true;
        }
      }

      return player1Victory;
    }

    static string GenerateGameState(Queue<int> player1, Queue<int> player2) {
      var array1 = player1.ToArray();
      var array2 = player2.ToArray();

      return String.Join(',', array1) + "<>" + String.Join(',', array2);
    }

    static int CalculateScore(Queue<int> deck) {
      var modifier = deck.Count;
      var score = 0;

      while(deck.Count > 0) {
        score += deck.Dequeue() * modifier;
        modifier--;
      }

      return score;
    }
  }
}