using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;

namespace AdventOfCode_2020.Days {
  public static class Day19 {
    public static int RegexMatch() {
      Dictionary<int, string> rules = new Dictionary<int, string>();
      // List<string> rules = new List<string>();
      List<string> tests = new List<string>();

      StreamReader reader = new StreamReader(@"AdventOfCode_2020/Days/19/testInput.txt");
      string line;
      while((line = reader.ReadLine()) != null) {
        if (!String.IsNullOrWhiteSpace(line)) {
          if (line.Contains(':')) {
            var parts = line.Split(':', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            if (parts[1].Contains('"')) { parts[1] = parts[1].Replace("\"", ""); }
            rules.Add(int.Parse(parts[0]), parts[1]);
          } else {
            tests.Add(line);
          }
        }
      }

      Node root = new Node();
      root.Value = rules[0];

      ParseNodes(root, rules);

      // Console.WriteLine("Tree Depth: {0}", TreeDepth(root));

      PrintTree(root, "", true);

      // List<Node> starts = FindLeaves(root);
      // int count = 0;
      // foreach(string t in tests) {
      //   Console.WriteLine("Testing: {0}", t);
      //   foreach(Node start in starts) {
      //     if (NavigateTree(start, t)) {
      //       count++;
      //       break;
      //     }
      //   }
      //   Console.WriteLine();
      // }

      // return count;
      return 0;
    }

    static bool NavigateTree(Node node, string test, int index = 0) {
      if (index >= test.Length) return false;
      Console.WriteLine("[{2}]: {0} ?= {1}", node.Value, test[index], index);
      if (node.Value[0] != test[index]) return false;
      index++;
      if(node.Children.Count == 0 && index == test.Length) return true;
      // if (node.Children.Count == 0) return false;
      // if (index == test.Length) return false;
      foreach(Node child in node.Children) {
        if (NavigateTree(child, test, index)) return true;
      }
      return false;
    }

    static List<Node> FindLeaves(Node node) {
      List<Node> leaves = new List<Node>();

      if (node.Parents.Count == 0) {
        leaves.Add(node);
      } else {
        foreach(Node p in node.Parents) {
          leaves.AddRange(FindLeaves(p));
        }
      }

      return leaves;
    }

    static int TreeDepth(Node root) {
      var maxChildDepth = 0;
      var depth = 1;

      foreach(Node child in root.Children) {
        var check = TreeDepth(child);
        if (check > maxChildDepth) maxChildDepth = check;
      }

      return depth + maxChildDepth;
    }

    static int TreeHeight(Node root) {
      var maxParentHeight = 0;
      var height = 1;

      foreach(Node parent in root.Parents) {
        var check = TreeHeight(parent);
        if (check > maxParentHeight) maxParentHeight = check;
      }

      return height + maxParentHeight;
    }
    
    static void ParseNodes(Node root, Dictionary<int, string> rules) {
      if (!root.NeedsParsing()) return; // Escape and don't get caught in an infinite loop
      Console.WriteLine("Trying to parse: {0}", root.Value);

      while(root.NeedsParsing()) {
        var toParse = root.Value;
        
        if (toParse.Contains("|")) {
          // Split Logic Here
          Console.WriteLine("I should make like a banana and split!");
          var parts = toParse.Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
          root.Value = parts[0];
          Node newNode = new Node();
          newNode.Value = parts[1];
          foreach(Node p in root.Parents) p.Children.Add(newNode);
          newNode.Children.AddRange(root.Children);
        } else if (toParse.Contains(" ")) {
          // Build Chain
          var parts = toParse.Split(' ');
          // List<Node> grandChildren = new List<Node>();
          // grandChildren = root.Children;
          // root.Children.Clear();
          root.Value = parts[0];
          var child = new Node();
          child.Value = String.Join(' ', parts.Subarray(1, parts.Length));
          root.Children.Add(child);
          child.Parents.Add(root);
          // child.Children.AddRange(grandChildren);
        } else {
          // Replace Single Entry
          var index = int.Parse(toParse);
          root.Value = rules[index];
        }

        Console.WriteLine("Current Work: {0}", root.Value);
        // Thread.Sleep(1000);
      }

      // foreach(Node p in root.Parents) {
      //   ParseNodes(p, rules);
      // }

      for(int i = 0; i < root.Children.Count; i++) {
        ParseNodes(root.Children[i], rules);
      }
    }

    class Node {
      public string Value { get; set; }
      public List<Node> Children { get; set; }
      public List<Node> Parents { get; set; }

      public Node() {
        Children = new List<Node>();
        Parents = new List<Node>();
      }

      public bool NeedsParsing() {
        return !(Value == "a" || Value == "b");
      }
    }

    static void PrintTree(Node tree, string indent, bool last) {
      Console.WriteLine($"{indent}+-{tree.Value}");
      indent += last ? "   " : "|  ";

      for(int i = 0; i < tree.Children.Count; i++) {
        PrintTree(tree.Children[i], indent, i == tree.Children.Count - 1);
      }
    }

    
  }
}