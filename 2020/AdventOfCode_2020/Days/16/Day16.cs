using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace AdventOfCode_2020.Days {
  public static class Day16 {
    public static int FindInvalidTickets() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/16/input.txt");
      Regex ruleRegex = new Regex(@"(?<field>.*): (?<range0min>\d+)-(?<range0max>\d+) or (?<range1min>\d+)-(?<range1max>\d+)");
      string line;
      int parseStyle = 0;
      List<int> yourTicket;
      List<List<int>> nearbyTickets = new List<List<int>>();
      List<TicketRule> ticketRules = new List<TicketRule>();
      while((line = reader.ReadLine()) != null) {
        if (!String.IsNullOrWhiteSpace(line)) {
          switch(parseStyle) {
            case 0:
              var match = ruleRegex.Match(line);
              var groups = match.Groups;
              // foreach(Group g in groups) Console.WriteLine("{0}: {1}", g.Name, g.Value);
              ticketRules.Add(new TicketRule(
                groups["field"].Value,
                int.Parse(groups["range0min"].Value),
                int.Parse(groups["range0max"].Value),
                int.Parse(groups["range1min"].Value),
                int.Parse(groups["range1max"].Value)
              ));
              break;
            case 1:
              if(line.Contains(',')) yourTicket = line.Split(',').Select(x => int.Parse(x)).ToList();
              break;
            case 2:
              if(line.Contains(',')) nearbyTickets.Add(line.Split(',').Select(x => int.Parse(x)).ToList());
              break;
            default:
              Console.WriteLine(line);
              break;
          }
        } else {
          parseStyle++;
        }
      }

      int errors = 0;

      foreach(List<int> ticket in nearbyTickets) {
        var index = ticket.FindIndex(p => !MatchesOne(ticketRules, p));
        // Console.WriteLine(ticket[index]);
        if (index > -1) errors += ticket[index];
      }

      return errors;
    }

    public static long FindFieldOrder() {
      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/16/input.txt");
      Regex ruleRegex = new Regex(@"(?<field>.*): (?<range0min>\d+)-(?<range0max>\d+) or (?<range1min>\d+)-(?<range1max>\d+)");
      string line;
      int parseStyle = 0;
      List<int> yourTicket = new List<int>();;
      List<List<int>> nearbyTickets = new List<List<int>>();
      List<TicketRule> ticketRules = new List<TicketRule>();
      List<List<TicketRule>> rulePermutations = new List<List<TicketRule>>();
      List<List<TicketRule>> validPermutations = new List<List<TicketRule>>();
      List<List<int>> validTickets = new List<List<int>>();
      Dictionary<string, List<int>> validRulePlacement = new Dictionary<string, List<int>>();

      // Read Data
      Console.Write("Reading data...");
      while((line = reader.ReadLine()) != null) {
        if (!String.IsNullOrWhiteSpace(line)) {
          switch(parseStyle) {
            case 0:
              var match = ruleRegex.Match(line);
              var groups = match.Groups;
              // foreach(Group g in groups) Console.WriteLine("{0}: {1}", g.Name, g.Value);
              ticketRules.Add(new TicketRule(
                groups["field"].Value,
                int.Parse(groups["range0min"].Value),
                int.Parse(groups["range0max"].Value),
                int.Parse(groups["range1min"].Value),
                int.Parse(groups["range1max"].Value)
              ));
              break;
            case 1:
              if(line.Contains(',')) yourTicket = line.Split(',').Select(x => int.Parse(x)).ToList();
              break;
            case 2:
              if(line.Contains(',')) nearbyTickets.Add(line.Split(',').Select(x => int.Parse(x)).ToList());
              break;
            default:
              Console.WriteLine(line);
              break;
          }
        } else {
          parseStyle++;
        }
      }
      Console.WriteLine("Done.");

      // Checking for invalid Tickets
      Console.Write("Validating Tickets...");
      foreach(List<int> ticket in nearbyTickets) {
        var index = ticket.FindIndex(p => !MatchesOne(ticketRules, p));
        // if (index > -1) errors += ticket[index];
        if (index == -1) validTickets.Add(ticket);
      }
      Console.WriteLine("Done.");

      // Build Rule Validation Dictionary
      foreach(TicketRule rule in ticketRules) {
        var positions = new List<int>();
        for(int i = 0; i < ticketRules.Count; i++) positions.Add(i);
        validRulePlacement.Add(rule.Field, positions);
      }
      PrintValidRulePlacement(validRulePlacement);
      Console.WriteLine();

      foreach(List<int> ticket in validTickets) {
        ValidateRulePlacements(ref validRulePlacement, ticket, ticketRules);
        // PrintValidRulePlacement(validRulePlacement);
        // Console.WriteLine();
      }
      
      PrintValidRulePlacement(validRulePlacement);

      bool isGood = validRulePlacement.All(p => p.Value.Count == 1);
      List<int> lockedValues = new List<int>();
      while(!isGood) {
        var nextTest = validRulePlacement.First(p => p.Value.Count == 1 && !lockedValues.Contains(p.Value[0]));
        lockedValues.Add(nextTest.Value[0]);
        Console.WriteLine("Rule: {0} belongs at index: {1}", nextTest.Key, nextTest.Value[0]);
        foreach(KeyValuePair<string, List<int>> pair in validRulePlacement) {
          if (pair.Key != nextTest.Key && pair.Value.Count > 1) { // Only Check for different Tests
            pair.Value.RemoveAll(v => lockedValues.Contains(v));
          }
        }
        isGood = lockedValues.Count == ticketRules.Count;
      }

      // Console.WriteLine("Rule Order: [{0}]", String.Join(',', lockedValues));
      PrintValidRulePlacement(validRulePlacement);

      
      List<int> answerIndecies = new List<int>();
      for(int i = 0; i < lockedValues.Count; i++) {
        var pair = validRulePlacement.First(p => p.Value[0] == i);
        if (pair.Key.Contains("departure")) {
          answerIndecies.Add(i);
        }
      }

      Console.WriteLine("Appropriate Rule indecies: [{0}]", String.Join(',', answerIndecies));

      long answer = 1;
      foreach(int index in answerIndecies) {
        answer *= yourTicket[index];
      }

      return answer;
    }

    static void ValidateRulePlacements(ref Dictionary<string, List<int>> rulePlacements, List<int> ticket, List<TicketRule> rules) {
      foreach(KeyValuePair<string, List<int>> pair in rulePlacements) {
        var toRemove = new List<int>();
        foreach(int index in pair.Value) {
          var testRule = rules.Find(r => r.Field == pair.Key);
          if (!testRule.Validate(ticket[index])) toRemove.Add(index);
        }
        rulePlacements[pair.Key].RemoveAll(x => toRemove.Contains(x));
      }
    }

    static void PrintValidRulePlacement(Dictionary<string, List<int>> dict) {
      foreach(KeyValuePair<string, List<int>> pair in dict) {
        Console.WriteLine("{0}: [{1}]", pair.Key, String.Join(',', pair.Value));
      }
    }

    static string RuleSetToString(List<TicketRule> ruleSet) {
      var fields = ruleSet.Select(r => r.Field);

      return String.Join(',', fields); 
    }

    static bool TicketMatchesRules(List<int> ticket, List<TicketRule> rules) {
      for(int i = 0; i < ticket.Count; i++) {
        if (!rules[i].Validate(ticket[i])) {
          Console.WriteLine("{0} violated {1}.", ticket[i], rules[i]);
          return false;
        }
      }

      return true;
    }

    static bool MatchesOne(List<TicketRule> rules, int value) {
      foreach(TicketRule rule in rules) {
        if (rule.Validate(value)) return true;
      }

      return false;
    }

    static List<List<T>> CreatePermuations<T>(List<T> list) {
      List<List<T>> permutations = new List<List<T>>();
      if (list.Count == 2) {
        permutations.Add(new List<T>() { list[0], list[1] });
        permutations.Add(new List<T>() { list[1], list[0] });
      } else {
        foreach(T item in list) {
          List<T> workingCopy = new List<T>(list);
          workingCopy.Remove(item);
          var subPermutations = CreatePermuations(workingCopy);
          foreach(List<T> p in subPermutations) {
            p.Insert(0, item);
            permutations.Add(p);
          }
        }
      }
      return permutations;
    }
  }

  class TicketRule {

    public string Field { get; set; }
    int Range0Min { get; set; }
    int Range0Max { get; set; }
    int Range1Min { get; set; }
    int Range1Max { get; set; }

    public TicketRule(string field, int range0min, int range0max, int range1min, int range1max) {
      Field = field;
      Range0Min = range0min;
      Range0Max = range0max;
      Range1Min = range1min;
      Range1Max = range1max;
    }

    public Boolean Validate(int value) {
      return (value >= Range0Min && value <= Range0Max) || (value >= Range1Min && value <= Range1Max);
    }

    public override string ToString() {
      return $"{Field}: {Range0Min}-{Range0Max} or {Range1Min}-{Range1Max}";
    }
  }
}