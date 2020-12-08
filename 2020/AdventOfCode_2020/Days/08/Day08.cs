using System;
using System.Collections.Generic;
using System.IO;

namespace AdventOfCode_2020.Days {

  public struct Instruction {
    public Instruction(string op, int arg) {
      Operation = op;
      Argument = arg;
    }

    public string Operation { get; }
    public int Argument { get; }

    public override string ToString() => $"{Operation}: {Argument}";
  }

  public static class Day08 {
    public static int SingleRunValue() {
      int accumulator = 0;
      int currentIndex = 0;
      List<int> touchedIndecies = new List<int>();
      List<Instruction> program = new List<Instruction>();
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/08/testInput.txt");
      string line;
      while((line = reader.ReadLine()) != null) {
        var parts = line.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        program.Add(new Instruction(parts[0], int.Parse(parts[1])));
      }

      // Console.WriteLine($"Number of Instructions: {program.Count}");

      do {
        touchedIndecies.Add(currentIndex);

        Console.WriteLine($"{currentIndex} => {program[currentIndex].ToString()} Accumulator: {accumulator}");

        switch(program[currentIndex].Operation) {
          case "acc":
            accumulator += program[currentIndex].Argument;
            currentIndex++;
            break;
          case "jmp":
            currentIndex += program[currentIndex].Argument;
            break;
          default: // No Operation
            currentIndex++;
            break;
        }

      } while(touchedIndecies.IndexOf(currentIndex) == -1 && currentIndex < program.Count);

      return accumulator;
    }

    public static int ValidateFullRun(List<Instruction> program) {
      int accumulator = 0;
      int currentIndex = 0;
      List<int> touchedIndecies = new List<int>();

      do {
        touchedIndecies.Add(currentIndex);

        switch(program[currentIndex].Operation) {
          case "acc":
            accumulator += program[currentIndex].Argument;
            currentIndex++;
            break;
          case "jmp":
            currentIndex += program[currentIndex].Argument;
            break;
          default: // No Operation
            currentIndex++;
            break;
        }

      } while(touchedIndecies.IndexOf(currentIndex) == -1 && currentIndex < program.Count);

      if (currentIndex >= program.Count) return accumulator;

      return Int32.MinValue;
    }

    public static int FindFullRun() {
      List<Instruction> program = new List<Instruction>();
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/08/input.txt");
      string line;
      while((line = reader.ReadLine()) != null) {
        var parts = line.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        program.Add(new Instruction(parts[0], int.Parse(parts[1])));
      }

      for(int i = 0; i < program.Count; i++) {
        var modifiedProgram = program.ConvertAll(p => p);
        if (modifiedProgram[i].Operation == "acc") continue;
        if (modifiedProgram[i].Operation == "nop") modifiedProgram[i] = new Instruction("jmp", modifiedProgram[i].Argument);
        if (modifiedProgram[i].Operation == "jmp") modifiedProgram[i] = new Instruction("nop", modifiedProgram[i].Argument);
        var accumulator = ValidateFullRun(modifiedProgram);
        if (accumulator > Int32.MinValue) return accumulator;
      }

      return Int32.MinValue;
    }
  }
}