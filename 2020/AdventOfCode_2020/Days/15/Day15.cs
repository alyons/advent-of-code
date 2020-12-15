using System;
using System.Collections.Generic;
using System.IO;

namespace AdventOfCode_2020.Days {
  public static class Day15 {
    public static int FindNumberInSequence(int index = 10) {
      List<int> sequence = new List<int>() { 0, 3, 6 }; // { 18,11,9,0,5,1 };
      Console.Clear();
      Console.WriteLine("Processing Sequence...");
      var start = DateTime.Now;

      for(int i = sequence.Count - 1; i < index; i++) {
        Console.SetCursorPosition(0, 1);
        Console.WriteLine("Calculating value at: {0}", i + 1);

        var test = sequence[i];
        if (sequence.IndexOf(test) == i) {
          sequence.Add(0);
        } else {
          // Do Nothing
          var priorIndex = sequence.FindLastIndex(i - 1, s => s == test);
          sequence.Add(i - priorIndex);
        }
        var elapsedTime = DateTime.Now - start;
        var estimatedCompletion = elapsedTime / i * index;
        Console.WriteLine("Elapsed Time: {0}", elapsedTime);
        Console.WriteLine("Completion Estimate: {0}", estimatedCompletion);
      }

      // Console.WriteLine(String.Join(',', sequence));
      Console.WriteLine();
      Console.WriteLine("Calculation complete!");

      return sequence[index - 1];
    }

    public static int FindIndexInSequence(int index) {
      List<int> seed = new List<int>() { 18,11,9,0,5,1 };
      Dictionary<int, SequenceValues> sequence = new Dictionary<int, SequenceValues>();
      for(int i = 0; i < seed.Count; i++) {
        sequence.Add(seed[i], new SequenceValues(1, i, -1));
      }

      var lastIndex = seed.Count - 1;
      var lastNumber = seed[lastIndex]; // Key

      while (lastIndex < index - 1) {
        lastIndex++;
        if (sequence[lastNumber].Count == 1) {
          // Add a zero and update the values;
          sequence[0].Count++;
          sequence[0].PriorIndex = sequence[0].LastIndex;
          sequence[0].LastIndex = lastIndex;
          lastNumber = 0;
        } else {
          var diff = sequence[lastNumber].IndexDifference();
          if (sequence.ContainsKey(diff)) {
            sequence[diff].Count++;
            sequence[diff].PriorIndex = sequence[diff].LastIndex;
            sequence[diff].LastIndex = lastIndex;
          } else {
            sequence.Add(diff, new SequenceValues(1, lastIndex, -1));
          }

          lastNumber = diff;
        }
      }


      Console.Clear();
      Console.WriteLine("Processing Sequence...");
      var start = DateTime.Now;

      return lastNumber;
    }

    public class SequenceValues {
      public int Count { get; set; }
      public int LastIndex { get; set; }
      public int PriorIndex { get; set; }

      public SequenceValues(int c, int l, int p) {
        Count = c;
        LastIndex = l;
        PriorIndex = p;
      }

      public int IndexDifference() { return LastIndex - PriorIndex; }

    }
  }
}